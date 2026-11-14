<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Get Paginated User Audit Logs
     */
    public function index(Request $request): JsonResponse
    {
        $query = UserLog::query()->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('message', 'like', "%{$search}%")
                  ->orWhere('module', 'like', "%{$search}%")
                  ->orWhere('actioned_by', 'like', "%{$search}%")
                  ->orWhere('taken_action', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->query('per_page', 10);
        $logs = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $logs->items(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'total' => $logs->total(),
            ],
        ]);
    }

    /**
     * Delete a Single Log Entry
     */
    public function destroy($id): JsonResponse
    {
        $log = UserLog::find($id);
        if ($log) {
            $log->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Log entry deleted successfully.',
        ]);
    }

    /**
     * Clear All Logs
     */
    public function clearAll(): JsonResponse
    {
        UserLog::truncate();

        return response()->json([
            'success' => true,
            'message' => 'All activity logs have been cleared successfully.',
        ]);
    }
}
