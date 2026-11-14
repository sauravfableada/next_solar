<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update Users Table with Roles, Status and Indexes
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['admin', 'staff'])->default('staff')->after('email');
            }
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 20)->nullable()->after('role');
            }
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable()->after('phone');
            }
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('avatar');
            }
            if (!Schema::hasColumn('users', 'department')) {
                $table->string('department', 100)->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('users', 'last_login_at')) {
                $table->timestamp('last_login_at')->nullable()->after('department');
            }
            if (!Schema::hasColumn('users', 'last_login_ip')) {
                $table->string('last_login_ip', 45)->nullable()->after('last_login_at');
            }

            // High-efficiency composite index for separate admin/staff login checks
            $table->index(['email', 'role', 'is_active'], 'idx_users_login_auth');
        });

        // 2. Stages Master Table
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->string('color', 50)->default('bg-blue-500');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'order'], 'idx_stages_active_order');
        });

        // 3. Customers Table
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->unsignedBigInteger('stage_id')->nullable();
            $table->unsignedBigInteger('assigned_staff_id')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('billing_unit')->nullable();
            $table->string('sub_division')->nullable();
            $table->string('sanction_no')->nullable();
            $table->string('sanctioned_capacity')->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Proper Composite & Foreign Key Indexes
            $table->index(['stage_id', 'created_at'], 'idx_customers_stage_created');
            $table->index(['phone', 'email'], 'idx_customers_phone_email');
            $table->index(['assigned_staff_id', 'stage_id'], 'idx_customers_staff_stage');
        });

        // 4. Leads Table
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('source', 100)->default('Website');
            $table->unsignedBigInteger('stage_id')->nullable();
            $table->unsignedBigInteger('assigned_staff_id')->nullable();
            $table->decimal('budget', 12, 2)->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_converted')->default(false);
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['stage_id', 'created_at'], 'idx_leads_stage_created');
            $table->index(['assigned_staff_id', 'is_converted'], 'idx_leads_staff_converted');
            $table->index(['phone'], 'idx_leads_phone');
        });

        // 5. Deals Table
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('deal_name');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('assigned_staff_id')->nullable();
            $table->decimal('deal_value', 14, 2)->default(0.00);
            $table->enum('status', ['open', 'won', 'lost', 'paused'])->default('open');
            $table->date('closing_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'created_at'], 'idx_deals_status_created');
            $table->index(['customer_id', 'status'], 'idx_deals_customer_status');
        });

        // 6. Estimates Table
        Schema::create('estimates', function (Blueprint $table) {
            $table->id();
            $table->string('estimate_no')->unique();
            $table->string('estimate_name');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('user_id')->nullable(); // created by
            $table->enum('type', ['residential', 'commercial', 'industrial', 'bank'])->default('residential');
            $table->decimal('quantity_kw', 10, 2)->default(0.00);
            $table->decimal('price', 14, 2)->default(0.00);
            $table->string('price_mode', 20)->default('BOM'); // BOM or Base Price
            $table->decimal('structure_charges', 12, 2)->default(0.00);
            $table->decimal('solar_meter_charges', 12, 2)->default(0.00);
            $table->decimal('total_amount', 14, 2)->default(0.00);
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->json('quotation_items')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'created_at'], 'idx_estimates_status_created');
            $table->index(['customer_id', 'status'], 'idx_estimates_customer_status');
        });

        // 7. Invoices Table
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique();
            $table->string('invoice_name');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('estimate_id')->nullable();
            $table->decimal('total_amount', 14, 2)->default(0.00);
            $table->decimal('paid_amount', 14, 2)->default(0.00);
            $table->decimal('balance_due', 14, 2)->default(0.00);
            $table->enum('status', ['paid', 'unpaid', 'partially_paid', 'paused'])->default('unpaid');
            $table->date('invoice_date');
            $table->date('due_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'due_date'], 'idx_invoices_status_duedate');
            $table->index(['customer_id', 'status'], 'idx_invoices_customer_status');
        });

        // 8. Tasks Table
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('task_type', 50)->default('Task');
            $table->unsignedBigInteger('assigned_to')->nullable(); // user_id
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'overdue'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['assigned_to', 'status', 'due_date'], 'idx_tasks_assigned_status_due');
        });

        // 9. Follow Ups Table
        Schema::create('follow_ups', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('lead_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // assigned staff
            $table->dateTime('scheduled_at');
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'status', 'scheduled_at'], 'idx_followups_user_status_sched');
        });

        // 10. Meetings Table
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'status', 'start_time'], 'idx_meetings_user_status_time');
        });

        // 11. Partners (Agents) Table
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('company_name')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->unsignedBigInteger('assigned_staff_id')->nullable();
            $table->date('joining_date')->nullable();
            $table->enum('commission_type', ['fixed', 'percentage'])->default('fixed');
            $table->decimal('commission_value', 12, 2)->default(0.00);
            $table->string('commission_basis', 100)->default('Estimate subtotal');
            $table->string('payable_on', 100)->default('Payment collection');
            $table->string('currency', 10)->default('INR');
            $table->string('pan_number', 50)->nullable();
            $table->string('gst_number', 50)->nullable();
            $table->string('bank_name', 100)->nullable();
            $table->string('account_holder', 150)->nullable();
            $table->string('account_number', 100)->nullable();
            $table->string('ifsc_code', 50)->nullable();
            $table->string('agreement_file')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_active', 'created_at'], 'idx_partners_active_created');
            $table->index(['code', 'phone'], 'idx_partners_code_phone');
        });

        // 12. Solar Form Documents Table (for Solar Docs & Subsidy Bonds)
        Schema::create('solar_form_documents', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->enum('document_type', ['Solar Documents', 'Subsidy Bond']);
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->json('form_data')->nullable();
            $table->string('aadhaar_file_path')->nullable();
            $table->string('docx_file_path')->nullable();
            $table->string('pdf_file_path')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['document_type', 'created_at'], 'idx_solar_docs_type_created');
            $table->index(['customer_name', 'customer_phone'], 'idx_solar_docs_cust_info');
        });

        // 13. User Audit Logs Table
        Schema::create('user_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('actioned_by')->default('Solar CRM');
            $table->string('module', 100);
            $table->enum('taken_action', ['ADD', 'UPDATE', 'DELETE'])->default('UPDATE');
            $table->text('message');
            $table->string('subtext')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['module', 'taken_action', 'created_at'], 'idx_user_logs_filter');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_logs');
        Schema::dropIfExists('solar_form_documents');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('meetings');
        Schema::dropIfExists('follow_ups');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('estimates');
        Schema::dropIfExists('deals');
        Schema::dropIfExists('leads');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('stages');
    }
};
