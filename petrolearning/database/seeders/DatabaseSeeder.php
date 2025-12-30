<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Jabatan;
use App\Models\Departemen;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Organization Structure FIRST (Direktorat -> Jabatan)
        $this->call([
            OrganizationSeeder::class,
        ]);

        // 2. Get Jabatan & Departemen untuk relasi User
        $jabatanStaffProcess = Jabatan::where('nama_jabatan', 'Staff Process')->first();
        $jabatanAnalyst = Jabatan::where('nama_jabatan', 'Analyst Lab')->first();
        $departemenProduksi = Departemen::where('nama_departemen', 'Produksi I')->first();
        $departemenLab = Departemen::where('nama_departemen', 'Laboratory Analysis')->first();

        // 3. Buat User dengan Relasi ke Jabatan & Departemen
        User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@petro.com',
            'password' => bcrypt('password'),
            'jabatan_id' => $jabatanStaffProcess?->id,
            'departemen_id' => $departemenProduksi?->id,
            'score' => 100
        ]);

        User::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@petro.com',
            'password' => bcrypt('password'),
            'jabatan_id' => $jabatanAnalyst?->id,
            'departemen_id' => $departemenLab?->id,
            'score' => 120
        ]);

        User::create([
            'name' => 'Admin Petro',
            'email' => 'admin@petro.com',
            'password' => bcrypt('password'),
            'jabatan_id' => null,
            'departemen_id' => null,
            'score' => 150
        ]);

        // 4. Seed Learning Materials
        $this->call([
            LearningMaterialSeeder::class,
        ]);
    }
}
