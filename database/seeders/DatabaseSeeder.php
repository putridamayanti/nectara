<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::insert([
            [
                'id'        => 1,
                'name'      => 'Admin Nectara',
                'email'     => 'admin@nectara.com',
                'password'  => Hash::make('admin'),
                'role_id'   => 1
            ]
        ]);
    }
}
