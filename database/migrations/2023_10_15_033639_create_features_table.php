<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Feature;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('features', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Feature::withoutEvents(function () {
            Feature::insert([
                ['id'   => 1, 'name'    => 'Dashboard'],
                ['id'   => 2, 'name'    => 'Announcement'],
                ['id'   => 3, 'name'    => 'Attendance'],
                ['id'   => 4, 'name'    => 'Department'],
                ['id'   => 5, 'name'    => 'Designation'],
                ['id'   => 6, 'name'    => 'Deposit'],
                ['id'   => 7, 'name'    => 'Employee'],
                ['id'   => 8, 'name'    => 'Expense'],
                ['id'   => 9, 'name'    => 'Leave'],
                ['id'   => 10, 'name'    => 'Leave Type'],
                ['id'   => 11, 'name'    => 'Permission'],
                ['id'   => 12, 'name'    => 'Role'],
                ['id'   => 13, 'name'    => 'User'],
                ['id'   => 14, 'name'    => 'Report'],
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('features');
    }
};
