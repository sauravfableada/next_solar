<?php

namespace Database\Seeders;

use App\Models\Stage;
use App\Models\User;
use App\Models\UserLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Administrator Account
        $admin = User::firstOrCreate(
            ['email' => 'admin@solar.com'],
            [
                'name' => 'Solar CRM',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'phone' => '1234567895',
                'is_active' => true,
                'avatar' => '/images/avatar-2.jpg',
                'department' => 'Executive Management',
            ]
        );

        // 2. Seed Staff Account
        $staff = User::firstOrCreate(
            ['email' => 'staff@solar.com'],
            [
                'name' => 'Operations Officer',
                'password' => Hash::make('password123'),
                'role' => 'staff',
                'phone' => '9876543210',
                'is_active' => true,
                'avatar' => '/images/avatar-1.jpg',
                'department' => 'Field Operations',
            ]
        );

        // 3. Seed Default Workflow Stages
        $defaultStages = [
            ['name' => 'New Lead', 'slug' => 'new-lead', 'order' => 1, 'color' => '#3b82f6'],
            ['name' => 'Site Survey', 'slug' => 'site-survey', 'order' => 2, 'color' => '#8b5cf6'],
            ['name' => 'Estimate Created', 'slug' => 'estimate-created', 'order' => 3, 'color' => '#f59e0b'],
            ['name' => 'Installation', 'slug' => 'installation', 'order' => 4, 'color' => '#10b981'],
            ['name' => 'Net Metering', 'slug' => 'net-metering', 'order' => 5, 'color' => '#06b6d4'],
            ['name' => 'Subsidy Disbursed', 'slug' => 'subsidy-disbursed', 'order' => 6, 'color' => '#10b981'],
        ];

        foreach ($defaultStages as $stage) {
            Stage::firstOrCreate(['slug' => $stage['slug']], $stage);
        }

        // 4. Seed Audit Logs
        $sampleLogs = [
            [
                'actioned_by' => 'Solar CRM',
                'module' => 'Follow Up',
                'taken_action' => 'UPDATE',
                'message' => 'Updated a Follow Up Purpose',
                'subtext' => '1 updated',
                'created_at' => now()->subMinutes(10),
            ],
            [
                'actioned_by' => 'Solar CRM',
                'module' => 'Support Ticket',
                'taken_action' => 'ADD',
                'message' => 'Created a Ticket Ticket - test customer',
                'subtext' => '5 added',
                'created_at' => now()->subMinutes(30),
            ],
            [
                'actioned_by' => 'Solar CRM',
                'module' => 'Support Ticket',
                'taken_action' => 'ADD',
                'message' => 'Created a Support Ticket Ticket - test customer',
                'subtext' => '5 added',
                'created_at' => now()->subHours(1),
            ],
            [
                'actioned_by' => 'Solar CRM',
                'module' => 'Invoice',
                'taken_action' => 'ADD',
                'message' => 'Created an Invoice INV-00001',
                'subtext' => '22 added',
                'created_at' => now()->subHours(2),
            ],
            [
                'actioned_by' => 'Solar CRM',
                'module' => 'Meeting',
                'taken_action' => 'ADD',
                'message' => 'Scheduled a Meeting test',
                'subtext' => '5 added',
                'created_at' => now()->subHours(3),
            ],
        ];

        foreach ($sampleLogs as $log) {
            UserLog::create(array_merge($log, ['user_id' => $admin->id, 'ip_address' => '127.0.0.1']));
        }
    }
}
