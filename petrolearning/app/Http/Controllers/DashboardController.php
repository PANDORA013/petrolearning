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

        return Inertia::render('Dashboard', [
            'aiData' => $aiData
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
}

