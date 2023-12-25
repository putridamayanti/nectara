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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('department_id');
            $table->integer('designation_id');
            $table->string('name');
            $table->string('avatar')->nullable();
            $table->string('phone');
            $table->integer('employment_type'); // 1. Full time 2. Part time 3. Freelance
            $table->string('basic_salary');
            $table->string('date_of_birth')->nullable();
            $table->integer('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('country_code')->nullable();
            $table->string('city')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('join_date')->nullable();
            $table->string('leave_date')->nullable();
            $table->integer('marital_status')->nullable()->default(1); // 1. Single 2. Married
            $table->integer('quota_leave')->default(14);
            $table->integer('remaining_leave')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
