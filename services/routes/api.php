<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - V1 Prefix
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // 1. Unified Authentication (Auto-handles Admin and Staff roles seamlessly)
    Route::post('/auth/login', [AuthController::class, 'unifiedLogin'])->middleware('throttle:15,1');
    Route::post('/auth/admin/login', [AuthController::class, 'adminLogin'])->middleware('throttle:15,1');
    Route::post('/auth/staff/login', [AuthController::class, 'staffLogin'])->middleware('throttle:15,1');

    // Public Settings lookup (brand, company info, logos for header/login/sidebar)
    Route::get('/settings/public', [\App\Http\Controllers\Api\SettingController::class, 'index']);

    // 2. Protected Routes (Sanctum Token Auth)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Profile & Security
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::match(['put', 'post'], '/profile', [ProfileController::class, 'update']);
        Route::post('/profile/change-password', [ProfileController::class, 'changePassword']);

        // Activity Logs
        Route::get('/user-logs', [LogController::class, 'index']);
        Route::delete('/user-logs/{id}', [LogController::class, 'destroy']);
        Route::delete('/user-logs', [LogController::class, 'clearAll']);

        // Dynamic Key-Value Settings (Authenticated Admin)
        Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class, 'index']);
        Route::post('/settings', [\App\Http\Controllers\Api\SettingController::class, 'update']);

        // Dashboard Analytics (Protected with Randomized TTL Cache)
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/pipeline-summary', [DashboardController::class, 'pipelineSummary']);
        Route::get('/dashboard/action-list', [DashboardController::class, 'actionList']);
    });
});
