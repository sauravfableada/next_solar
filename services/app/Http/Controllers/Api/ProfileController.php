<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Helper to return absolute URL for avatars
     */
    protected function formatAvatarUrl(?string $avatar): string
    {
        if (empty($avatar)) {
            return url('/images/avatar-2.jpg');
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        if (str_starts_with($avatar, '/storage/')) {
            return url($avatar);
        }

        if (str_starts_with($avatar, 'storage/')) {
            return url('/' . $avatar);
        }

        if (str_starts_with($avatar, '/')) {
            return url($avatar);
        }

        return url('/storage/' . $avatar);
    }

    /**
     * Get Current Authenticated User Profile
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '1234567895',
                'user_name' => $user->user_name ?? 'admin',
                'role' => $user->role,
                'avatar' => $this->formatAvatarUrl($user->avatar),
                'department' => $user->department,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    /**
     * Update User Profile Details (Supports multipart avatar upload and JSON)
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_name' => 'required|string|max:100|alpha_dash|unique:users,user_name,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:30',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:51200', // max 50MB
        ], [
            'user_name.unique' => 'The chosen user name is already taken. Please choose another unique user name.',
            'user_name.alpha_dash' => 'The user name may only contain letters, numbers, dashes and underscores.',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'user_name' => $validated['user_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? $user->phone,
        ];

        // Process file upload if provided
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = 'avatar_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('avatars', $filename, 'public');
            $updateData['avatar'] = '/storage/' . $path;
        }

        $user->update($updateData);

        // Log this action in user_logs
        UserLog::create([
            'user_id' => $user->id,
            'actioned_by' => $user->name,
            'module' => 'Profile',
            'taken_action' => 'UPDATE',
            'message' => 'Updated profile information' . ($request->hasFile('avatar') ? ' & avatar' : '') . ' for user: ' . $user->name,
            'subtext' => 'Profile details updated',
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully!',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'user_name' => $user->user_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'avatar' => $this->formatAvatarUrl($user->avatar),
            ],
        ]);
    }

    /**
     * Change User Password with Security Checks
     */
    public function changePassword(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => ['required', 'string', 'min:6'],
            'new_password_confirmation' => 'required|same:new_password',
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The provided current password does not match our records.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        // Log password change event
        UserLog::create([
            'user_id' => $user->id,
            'actioned_by' => $user->name,
            'module' => 'Security',
            'taken_action' => 'UPDATE',
            'message' => 'Changed account password successfully',
            'subtext' => 'Security credentials updated',
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully!',
        ]);
    }
}
