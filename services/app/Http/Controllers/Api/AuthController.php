<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Unified Universal Login (Auto-detects Admin or Staff role)
     */
    public function unifiedLogin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'device_name' => 'nullable|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password. Please check your credentials.',
            ], 401);
        }

        if (! $user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is inactive. Please contact the administrator.',
            ], 403);
        }

        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        $role = $user->role ?? 'staff';
        $deviceName = $validated['device_name'] ?? ('nextjs-' . $role);
        $token = $user->createToken($deviceName, ['role:' . $role])->plainTextToken;

        // Auto-assign full permissions if admin, otherwise use saved staff permissions
        $permissions = $role === 'admin'
            ? ['*']
            : ($user->permissions ?? [
                'Customers' => ['view' => true, 'insert' => true, 'edit' => true, 'delete' => true, 'all' => true],
                'Partners' => ['view' => true, 'insert' => true, 'edit' => true, 'delete' => true, 'all' => true],
            ]);

        // Log login action
        UserLog::create([
            'user_id' => $user->id,
            'actioned_by' => $user->name,
            'module' => 'Authentication',
            'taken_action' => 'ADD',
            'message' => "User signed in as {$role}",
            'subtext' => 'Successful session authentication',
            'ip_address' => $request->ip(),
        ]);

        $avatarUrl = $user->avatar
            ? (str_starts_with($user->avatar, 'http') ? $user->avatar : url($user->avatar))
            : url('/images/avatar-2.jpg');

        return response()->json([
            'success' => true,
            'message' => "Welcome back, {$user->name}! Login successful.",
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $role,
                    'avatar' => $avatarUrl,
                    'department' => $user->department,
                    'permissions' => $permissions,
                ],
                'token' => $token,
                'redirect' => '/admin/dashboard',
            ],
        ]);
    }

    /**
     * Backward-compatible admin login route
     */
    public function adminLogin(Request $request): JsonResponse
    {
        return $this->unifiedLogin($request);
    }

    /**
     * Backward-compatible staff login route
     */
    public function staffLogin(Request $request): JsonResponse
    {
        return $this->unifiedLogin($request);
    }

    /**
     * Get Current Authenticated Profile
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        $role = $user->role ?? 'staff';

        $avatarUrl = $user->avatar
            ? (str_starts_with($user->avatar, 'http') ? $user->avatar : url($user->avatar))
            : url('/images/avatar-2.jpg');

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $role,
                'phone' => $user->phone,
                'avatar' => $avatarUrl,
                'department' => $user->department,
                'permissions' => $role === 'admin' ? ['*'] : ($user->permissions ?? []),
            ],
        ]);
    }

    /**
     * Logout and Revoke Current Access Token
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
