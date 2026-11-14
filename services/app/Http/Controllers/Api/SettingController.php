<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\UserLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Get all settings grouped or by specific group
     */
    public function index(Request $request): JsonResponse
    {
        $group = $request->query('group');

        $query = Setting::query();
        if ($group) {
            $query->where('group', $group);
        }

        $settings = $query->get();

        $data = [];
        foreach ($settings as $setting) {
            $val = $setting->value;
            if ($setting->type === 'boolean') {
                $val = filter_var($val, FILTER_VALIDATE_BOOLEAN);
            } elseif ($setting->type === 'json') {
                $val = json_decode($val, true);
            } elseif ($setting->type === 'file' && !empty($val) && !str_starts_with($val, 'http')) {
                $val = url($val);
            }
            $data[$setting->key] = $val;
        }

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    /**
     * Batch Save or Update Settings (Key-Value)
     */
    public function update(Request $request): JsonResponse
    {
        $group = $request->input('group', 'general');
        $settingsData = $request->except(['group', '_method', 'company_logo', 'short_logo']);

        // Handle file uploads for logos
        if ($request->hasFile('company_logo')) {
            $file = $request->file('company_logo');
            $filename = 'logo_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('settings', $filename, 'public');
            Setting::set('company_logo', '/storage/' . $path, $group, 'file');
        }

        if ($request->hasFile('short_logo')) {
            $file = $request->file('short_logo');
            $filename = 'short_logo_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('settings', $filename, 'public');
            Setting::set('short_logo', '/storage/' . $path, $group, 'file');
        }

        // Save key-value pairs
        foreach ($settingsData as $key => $value) {
            $type = 'string';
            if (is_bool($value) || $value === 'true' || $value === 'false') {
                $type = 'boolean';
                $value = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
            } elseif (is_array($value)) {
                $type = 'json';
            } elseif (is_numeric($value)) {
                $type = 'number';
            }

            Setting::set($key, $value, $group, $type);
        }

        // Log setting changes
        $user = $request->user();
        if ($user) {
            UserLog::create([
                'user_id' => $user->id,
                'actioned_by' => $user->name,
                'module' => 'Settings',
                'taken_action' => 'UPDATE',
                'message' => "Updated settings under group: {$group}",
                'subtext' => 'Dynamic configuration updated',
                'ip_address' => $request->ip(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings saved successfully!',
        ]);
    }
}
