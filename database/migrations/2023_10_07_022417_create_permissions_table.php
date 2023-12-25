<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('feature_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $default_permissions = [
            ["id" => 1, "feature_id" => 1, "name" => "Dashboard Employee Widget"],
            ["id" => 2, "feature_id" => 1, "name" => "Dashboard Expense Widget"],
            ["id" => 3, "feature_id" => 1, "name" => "Dashboard Leave Widget"],
            ["id" => 4, "feature_id" => 1, "name" => "Dashboard Deposit Widget"],
            ["id" => 5, "feature_id" => 1, "name" => "Dashboard Attendance Widget"],
            [
                "id" => 6,
                "feature_id" => 1,
                "name" => "Dashboard Personal Attendance Month Widget",
            ],
            [
                "id" => 7,
                "feature_id" => 1,
                "name" => "Dashboard Personal Leave Year Widget",
            ],
            [
                "id" => 8,
                "feature_id" => 1,
                "name" => "Dashboard Personal Attendance Clock",
            ],
            ["id" => 9, "feature_id" => 2, "name" => "Announcement List"],
            ["id" => 10, "feature_id" => 2, "name" => "Announcement Create"],
            ["id" => 11, "feature_id" => 2, "name" => "Announcement Update"],
            ["id" => 12, "feature_id" => 2, "name" => "Announcement Delete"],
            ["id" => 13, "feature_id" => 3, "name" => "Attendance List"],
            ["id" => 14, "feature_id" => 3, "name" => "Attendance Create"],
            ["id" => 15, "feature_id" => 3, "name" => "Attendance Update"],
            ["id" => 16, "feature_id" => 3, "name" => "Attendance Delete"],
            ["id" => 17, "feature_id" => 3, "name" => "Attendance Personal List"],
            ["id" => 18, "feature_id" => 3, "name" => "Attendance Personal Clock"],
            ["id" => 19, "feature_id" => 4, "name" => "Department List"],
            ["id" => 20, "feature_id" => 4, "name" => "Department Create"],
            ["id" => 21, "feature_id" => 4, "name" => "Department Update"],
            ["id" => 22, "feature_id" => 4, "name" => "Department Delete"],
            ["id" => 23, "feature_id" => 5, "name" => "Designation List"],
            ["id" => 24, "feature_id" => 5, "name" => "Designation Create"],
            ["id" => 25, "feature_id" => 5, "name" => "Designation Update"],
            ["id" => 26, "feature_id" => 5, "name" => "Designation Delete"],
            ["id" => 27, "feature_id" => 6, "name" => "Deposit List"],
            ["id" => 28, "feature_id" => 6, "name" => "Deposit Create"],
            ["id" => 29, "feature_id" => 6, "name" => "Deposit Update"],
            ["id" => 30, "feature_id" => 6, "name" => "Deposit Delete"],
            ["id" => 31, "feature_id" => 7, "name" => "Employee List"],
            ["id" => 32, "feature_id" => 7, "name" => "Employee Create"],
            ["id" => 33, "feature_id" => 7, "name" => "Employee Update"],
            ["id" => 34, "feature_id" => 7, "name" => "Employee Delete"],
            ["id" => 35, "feature_id" => 8, "name" => "Expense List"],
            ["id" => 36, "feature_id" => 8, "name" => "Expense Create"],
            ["id" => 37, "feature_id" => 8, "name" => "Expense Update"],
            ["id" => 38, "feature_id" => 8, "name" => "Expense Delete"],
            ["id" => 39, "feature_id" => 8, "name" => "Expense List"],
            ["id" => 40, "feature_id" => 9, "name" => "Leave List"],
            ["id" => 41, "feature_id" => 9, "name" => "Leave Create"],
            ["id" => 42, "feature_id" => 9, "name" => "Leave Update"],
            ["id" => 43, "feature_id" => 9, "name" => "Leave Delete"],
            ["id" => 44, "feature_id" => 9, "name" => "Leave Personal List"],
            ["id" => 45, "feature_id" => 9, "name" => "Leave Personal Request"],
            ["id" => 46, "feature_id" => 10, "name" => "Leave Type List"],
            ["id" => 47, "feature_id" => 10, "name" => "Leave Type Create"],
            ["id" => 48, "feature_id" => 10, "name" => "Leave Type Update"],
            ["id" => 49, "feature_id" => 10, "name" => "Leave Type Delete"],
            ["id" => 50, "feature_id" => 11, "name" => "Permission List"],
            ["id" => 51, "feature_id" => 11, "name" => "Permission Create"],
            ["id" => 52, "feature_id" => 11, "name" => "Permission Update"],
            ["id" => 53, "feature_id" => 11, "name" => "Permission Delete"],
            ["id" => 54, "feature_id" => 12, "name" => "Role List"],
            ["id" => 55, "feature_id" => 12, "name" => "Role Create"],
            ["id" => 56, "feature_id" => 12, "name" => "Role Update"],
            ["id" => 57, "feature_id" => 12, "name" => "Role Delete"],
            ["id" => 58, "feature_id" => 13, "name" => "User List"],
            ["id" => 59, "feature_id" => 13, "name" => "User Create"],
            ["id" => 60, "feature_id" => 13, "name" => "User Update"],
            ["id" => 61, "feature_id" => 13, "name" => "User Delete"],
            ["id" => 62, "feature_id" => 14, "name" => "Attendance Report"],
            ["id" => 63, "feature_id" => 14, "name" => "Employee Report"],
            ["id" => 64, "feature_id" => 14, "name" => "Expense Report"],
            ["id" => 65, "feature_id" => 14, "name" => "Deposit Report"],
        ];

        Permission::withoutEvents(function () use ($default_permissions) {
            Permission::insert($default_permissions);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
