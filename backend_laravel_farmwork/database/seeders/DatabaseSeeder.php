<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // RoleSeeder::class,
            // PermissionSeeder::class,
            UserSeeder::class,
            InfoShopSeeder::class
            // CategorySeeder::class,
            // ProductSeeder::class,
        ]);
    }
}
