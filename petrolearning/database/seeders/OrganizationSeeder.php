<?php

namespace Database\Seeders;

use App\Models\Direktorat;
use App\Models\Kompartemen;
use App\Models\Departemen;
use App\Models\Bagian;
use App\Models\Jabatan;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Direktorat
        $direktorat = Direktorat::create(['nama_direktorat' => 'Direktorat Operasi']);

        // 2. Kompartemen
        $kompartemenProduksi = Kompartemen::create([
            'direktorat_id' => $direktorat->id,
            'nama_kompartemen' => 'Kompartemen Produksi'
        ]);
        
        $kompartemenQC = Kompartemen::create([
            'direktorat_id' => $direktorat->id,
            'nama_kompartemen' => 'Kompartemen Quality Control'
        ]);

        // 3. Departemen (Produksi)
        $deptProduksi1 = Departemen::create([
            'kompartemen_id' => $kompartemenProduksi->id,
            'nama_departemen' => 'Produksi I'
        ]);
        
        $deptProduksi2 = Departemen::create([
            'kompartemen_id' => $kompartemenProduksi->id,
            'nama_departemen' => 'Produksi II'
        ]);

        // 3. Departemen (QC)
        $deptLab = Departemen::create([
            'kompartemen_id' => $kompartemenQC->id,
            'nama_departemen' => 'Laboratory Analysis'
        ]);

        // 4. Bagian (Produksi I)
        $bagianProcess = Bagian::create([
            'departemen_id' => $deptProduksi1->id,
            'nama_bagian' => 'Process Unit'
        ]);

        // 4. Bagian (QC)
        $bagianChemical = Bagian::create([
            'departemen_id' => $deptLab->id,
            'nama_bagian' => 'Chemical Analysis'
        ]);

        // 5. Jabatan (Process Unit)
        Jabatan::create([
            'bagian_id' => $bagianProcess->id,
            'nama_jabatan' => 'Staff Process',
            'grade_level' => 2
        ]);

        Jabatan::create([
            'bagian_id' => $bagianProcess->id,
            'nama_jabatan' => 'Supervisor Process',
            'grade_level' => 4
        ]);

        Jabatan::create([
            'bagian_id' => $bagianProcess->id,
            'nama_jabatan' => 'Manager Process',
            'grade_level' => 5
        ]);

        // 5. Jabatan (Chemical Analysis)
        Jabatan::create([
            'bagian_id' => $bagianChemical->id,
            'nama_jabatan' => 'Analyst Lab',
            'grade_level' => 3
        ]);

        Jabatan::create([
            'bagian_id' => $bagianChemical->id,
            'nama_jabatan' => 'Senior Analyst',
            'grade_level' => 4
        ]);
    }
}

