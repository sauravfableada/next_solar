<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Deal;
use App\Models\Estimate;
use App\Models\FollowUp;
use App\Models\Invoice;
use App\Models\Lead;
use App\Models\Stage;
use App\Models\Task;
use App\Services\CacheService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Top 4 KPI Metrics with Randomized Cache TTL (prevents cache stampede)
     */
    public function stats(Request $request): JsonResponse
    {
        $cacheKey = 'dashboard:stats:' . ($request->user()->role ?? 'guest') . ':' . ($request->user()->id ?? '0');

        // Randomized TTL ~15 minutes with 20% jitter (12 to 18 minutes)
        $data = CacheService::rememberWithJitter($cacheKey, 15, function () use ($request) {
            $user = $request->user();
            $isAdmin = $user && $user->role === 'admin';

            $newLeadsQuery = DB::table('leads')->whereNull('deleted_at');
            $openDealsQuery = DB::table('deals')->whereNull('deleted_at')->where('status', 'open');
            $pendingFollowupsQuery = DB::table('follow_ups')->whereNull('deleted_at')->where('status', 'pending');
            $unpaidInvoicesQuery = DB::table('invoices')->whereNull('deleted_at')->whereIn('status', ['unpaid', 'partially_paid']);

            // Scope data for staff if not admin
            if (!$isAdmin && $user) {
                $newLeadsQuery->where('assigned_staff_id', $user->id);
                $openDealsQuery->where('assigned_staff_id', $user->id);
                $pendingFollowupsQuery->where('user_id', $user->id);
            }

            return [
                'new_leads' => str_pad((string) $newLeadsQuery->count(), 2, '0', STR_PAD_LEFT),
                'open_deals' => str_pad((string) $openDealsQuery->count(), 2, '0', STR_PAD_LEFT),
                'pending_followups' => str_pad((string) $pendingFollowupsQuery->count(), 2, '0', STR_PAD_LEFT),
                'outstanding_payments' => str_pad((string) $unpaidInvoicesQuery->count(), 2, '0', STR_PAD_LEFT),
                'total_estimate_value' => (float) DB::table('estimates')->whereNull('deleted_at')->sum('total_amount'),
            ];
        }, 20);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    /**
     * 16 Pipeline Stages Customer Breakdown with Randomized Cache TTL
     */
    public function pipelineSummary(): JsonResponse
    {
        $cacheKey = 'dashboard:pipeline:summary';

        // 30-minute randomized TTL with jitter
        $summary = CacheService::rememberWithJitter($cacheKey, 30, function () {
            $stages = DB::table('stages')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();

            // Count customers per stage via single optimized group-by query
            $stageCounts = DB::table('customers')
                ->whereNull('deleted_at')
                ->select('stage_id', DB::raw('count(*) as total'))
                ->groupBy('stage_id')
                ->pluck('total', 'stage_id')
                ->toArray();

            return $stages->map(function ($stage) use ($stageCounts) {
                return [
                    'id' => $stage->id,
                    'name' => $stage->name,
                    'slug' => $stage->slug,
                    'color' => $stage->color,
                    'count' => $stageCounts[$stage->id] ?? 0,
                ];
            });
        }, 25);

        return response()->json([
            'success' => true,
            'data' => $summary,
        ]);
    }

    /**
     * Action List: Overdue tasks and high priority items
     */
    public function actionList(Request $request): JsonResponse
    {
        $user = $request->user();

        $tasks = DB::table('tasks')
            ->whereNull('deleted_at')
            ->whereIn('status', ['pending', 'in_progress'])
            ->orderBy('due_date', 'asc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tasks,
        ]);
    }
}

