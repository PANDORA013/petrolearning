<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Mock data kompetensi user (nanti ambil dari database)
        $userProfile = [
            'user_id' => $user->id,
            'current_role' => $user->jabatan->nama_jabatan ?? 'Staff',
            'competencies' => [
                'Teknis' => 2,
                'K3' => 3,
                'Manajemen' => 1,
                'Leadership' => 2
            ],
            'experience_years' => 3,
            'last_training_date' => now()->subMonths(2)->toDateString()
        ];

        // Call Python AI Service
        $aiData = [
            'career_predictions' => $this->getCareerPredictions($userProfile),
            'course_recommendations' => $this->getCourseRecommendations($userProfile)
        ];

        // Data tambahan untuk dashboard
        $serverData = [
            'stats' => [
                'learning_hours' => 34, // Nanti hitung dari tabel learning_history
                'certificates' => 5,
                'avg_score' => 4.2
            ],
            'courses' => $this->getMockCourses(), // Simulasi ambil dari DB
            'employees' => $this->getMockEmployees(), // Simulasi admin data
        ];

        return Inertia::render('Dashboard', [
            'aiData' => $aiData,
            'serverData' => $serverData
        ]);
    }

    private function getCareerPredictions($userProfile)
    {
        try {
            $response = Http::timeout(5)->post('http://127.0.0.1:8001/predict/career', $userProfile);
            
            if ($response->successful()) {
                return $response->json();
            }
        } catch (\Exception $e) {
            Log::warning('AI Service unavailable: ' . $e->getMessage());
        }

        // Fallback data jika AI service down
        return [
            'model' => 'Fallback Mock',
            'predictions' => [
                [
                    'target_role' => 'Supervisor Process',
                    'probability' => 0.75,
                    'gap_analysis' => [
                        'required_competencies' => ['Teknis: Level 4', 'Leadership: Level 3'],
                        'current_status' => 'Teknis: Level 2'
                    ]
                ]
            ]
        ];
    }

    private function getCourseRecommendations($userProfile)
    {
        try {
            $response = Http::timeout(5)->post('http://127.0.0.1:8001/recommend/courses', $userProfile);
            
            if ($response->successful()) {
                return $response->json();
            }
        } catch (\Exception $e) {
            Log::warning('AI Service unavailable: ' . $e->getMessage());
        }

        // Fallback data
        return [
            'model' => 'Fallback Mock',
            'predictions' => [
                [
                    'course_id' => 1,
                    'title' => 'Advanced Leadership',
                    'predicted_rating' => 4.8,
                    'category' => 'Leadership',
                    'reason' => 'Meningkatkan kompetensi Leadership'
                ]
            ]
        ];
    }

    // Helper untuk data dummy Database (Sementara)
    private function getMockCourses()
    {
        return [
            ['id' => 101, 'title' => 'Sertifikasi K3 Tingkat Lanjut', 'category' => 'Safety', 'level' => 'Advanced', 'progress' => 0, 'modules' => 12, 'rating' => 4.8, 'type' => 'GAP', 'xgboost_score' => 95, 'svd_score' => 70],
            ['id' => 102, 'title' => 'Manajemen Proyek Supervisor', 'category' => 'Manajemen', 'level' => 'Intermediate', 'progress' => 0, 'modules' => 8, 'rating' => 4.5, 'type' => 'GAP', 'xgboost_score' => 92, 'svd_score' => 65],
            ['id' => 103, 'title' => 'Analisis Kimia Terpadu', 'category' => 'Teknis', 'level' => 'Advanced', 'progress' => 0, 'modules' => 15, 'rating' => 4.9, 'type' => 'GAP', 'xgboost_score' => 88, 'svd_score' => 60],
            ['id' => 104, 'title' => 'Python Data Science', 'category' => 'IT', 'level' => 'Basic', 'progress' => 0, 'modules' => 10, 'rating' => 4.7, 'type' => 'POPULAR', 'xgboost_score' => 20, 'svd_score' => 95],
            ['id' => 105, 'title' => 'Leadership 101', 'category' => 'Soft Skill', 'level' => 'Basic', 'progress' => 45, 'modules' => 4, 'rating' => 4.6, 'type' => 'POPULAR', 'xgboost_score' => 40, 'svd_score' => 90],
        ];
    }

    private function getMockEmployees()
    {
        return [
            ['id' => 1, 'name' => 'Budi Santoso', 'position' => 'Staff Process', 'unit' => 'Produksi I', 'gap' => 2, 'readiness' => 45],
            ['id' => 2, 'name' => 'Siti Aminah', 'position' => 'Analyst Lab', 'unit' => 'Quality Control', 'gap' => 0, 'readiness' => 92],
        ];
    }
}

