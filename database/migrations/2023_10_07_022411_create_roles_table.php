<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_admin')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Role::withoutEvents(function () {
            Role::insert([
                ['id' => 1, 'name'  => 'Administrator', 'is_admin'  => 1],
                ['id' => 2, 'name'  => 'Manager', 'is_admin' => 0],
                ['id' => 3, 'name'  => 'Employee', 'is_admin' => 0],
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
