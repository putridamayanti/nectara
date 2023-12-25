<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\RolePermission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('role_id');
            $table->integer('permission_id');
            $table->timestamps();
        });

        RolePermission::withoutEvents(function () {
            RolePermission::insert([
                ["role_id" => 2, "permission_id" => 1],
                ["role_id" => 2, "permission_id" => 2],
                ["role_id" => 2, "permission_id" => 3],
                ["role_id" => 2, "permission_id" => 4],
                ["role_id" => 2, "permission_id" => 5],
                ["role_id" => 2, "permission_id" => 9],
                ["role_id" => 2, "permission_id" => 10],
                ["role_id" => 2, "permission_id" => 11],
                ["role_id" => 2, "permission_id" => 12],
                ["role_id" => 2, "permission_id" => 13],
                ["role_id" => 2, "permission_id" => 14],
                ["role_id" => 2, "permission_id" => 15],
                ["role_id" => 2, "permission_id" => 16],
                ["role_id" => 2, "permission_id" => 31],
                ["role_id" => 2, "permission_id" => 32],
                ["role_id" => 2, "permission_id" => 33],
                ["role_id" => 2, "permission_id" => 34],
                ["role_id" => 2, "permission_id" => 40],
                ["role_id" => 2, "permission_id" => 41],
                ["role_id" => 2, "permission_id" => 42],
                ["role_id" => 2, "permission_id" => 43],
                ["role_id" => 2, "permission_id" => 57],
                ["role_id" => 2, "permission_id" => 58],
                ["role_id" => 2, "permission_id" => 59],
                ["role_id" => 2, "permission_id" => 60],
                ["role_id" => 2, "permission_id" => 62],
                ["role_id" => 2, "permission_id" => 63],
                ["role_id" => 3, "permission_id" => 6],
                ["role_id" => 3, "permission_id" => 7],
                ["role_id" => 3, "permission_id" => 8],
                ["role_id" => 3, "permission_id" => 17],
                ["role_id" => 3, "permission_id" => 18],
                ["role_id" => 3, "permission_id" => 44],
                ["role_id" => 3, "permission_id" => 45],
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_permissions');
    }
};
