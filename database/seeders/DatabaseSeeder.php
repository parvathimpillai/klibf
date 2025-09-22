<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        User::factory()->create([
            'name' => 'superadmin',
            'email' => 'itsection@niyamasabha.in',
            'password' => 'admin'

        ]);
        // assign role user to the users




        $user = User::find(1);
        $user->assignRole('admin');
    }
}
