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
            'name' => 'Carlos RGL',
            'email' => 'contact@carlosrgl.com',
            'password' => '$2y$10$3Q6Q6Z'
        ]);
        // assign role user to the users
        User::factory(100)->create()->each(function ($user) {
            $user->assignRole('user');
        });



        $user = User::find(1);
        $user->assignRole('admin');
    }
}
