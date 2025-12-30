<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LearningMaterial;

class LearningMaterialSeeder extends Seeder
{
    public function run()
    {
        $courses = [
            [
                'title' => 'Sertifikasi K3 Tingkat Lanjut',
                'category' => 'Safety',
                'level' => 'Advanced',
                'competency_target' => 'K3 Umum', // Kolom baru untuk mapping
                'rating' => 4.8,
                'modules' => 12,
                'duration' => '12h',
            ],
            [
                'title' => 'Manajemen Proyek Supervisor',
                'category' => 'Manajemen',
                'level' => 'Intermediate',
                'competency_target' => 'Manajemen Proyek',
                'rating' => 4.5,
                'modules' => 8,
                'duration' => '8h',
            ],
            [
                'title' => 'Analisis Kimia Terpadu',
                'category' => 'Teknis',
                'level' => 'Advanced',
                'competency_target' => 'Teknis Kimia',
                'rating' => 4.9,
                'modules' => 15,
                'duration' => '15h',
            ],
            [
                'title' => 'Leadership 101: Building Teams',
                'category' => 'Soft Skill',
                'level' => 'Basic',
                'competency_target' => 'Leadership',
                'rating' => 4.6,
                'modules' => 4,
                'duration' => '4h',
            ],
            [
                'title' => 'Python for Data Science',
                'category' => 'IT',
                'level' => 'Basic',
                'competency_target' => 'Data Analytics',
                'rating' => 4.9,
                'modules' => 6,
                'duration' => '6h',
            ],
        ];

        foreach ($courses as $course) {
            LearningMaterial::create($course);
        }
    }
}