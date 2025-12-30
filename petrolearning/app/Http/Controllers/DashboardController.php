<?php

namespace App\Http\Controllers;

use App\Models\LearningMaterial;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // 1. Prepare user profile untuk AI
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

        // 2. Get courses from DATABASE (tidak hardcode lagi!)
        $coursesFromDB = LearningMaterial::all()->map(function($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'category' => $course->category,
                'level' => $course->level,
                'rating' => (float) $course->rating,
                'modules' => $course->modules,
            ];
        })->toArray();

        // 3. Send courses to Python AI for scoring
        $scoredCourses = $this->getCoursesWithAIScores($userProfile, $coursesFromDB);

        // 4. Call AI Service for predictions
        $aiData = [
            'career_predictions' => $this->getCareerPredictions($userProfile),
            'course_recommendations' => $this->getCourseRecommendations($userProfile)
        ];

        // 5. Get employee data (untuk admin view)
        $employees = $this->getEmployeesData();

        // 6. Prepare server data
        $serverData = [
            'stats' => [
                'learning_hours' => 34, // Nanti hitung dari tabel learning_history
                'certificates' => 5,
                'avg_score' => 4.2
            ],
            'courses' => $scoredCourses, // ← Ini sudah ada xgboost_score & svd_score!
            'employees' => $employees,
        ];

        return Inertia::render('Dashboard', [
            'aiData' => $aiData,
            'serverData' => $serverData
        ]);
    }

    private function getCoursesWithAIScores($userProfile, $courses)
    {
        try {
            $response = Http::timeout(5)->post('http://127.0.0.1:8001/score/courses', [
                'user_profile' => $userProfile,
                'courses' => $courses
            ]);
            
            if ($response->successful()) {
                $result = $response->json();
                // Return courses with progress added
                return collect($result['courses'])->map(function($course) {
                    return array_merge($course, ['progress' => 0]); // Add progress field
                })->toArray();
            }
        } catch (\Exception $e) {
            Log::warning('AI Scoring Service unavailable: ' . $e->getMessage());
        }

        // Fallback: Return courses with random scores
        return collect($courses)->map(function($course) {
            return array_merge($course, [
                'xgboost_score' => rand(50, 100),
                'svd_score' => rand(50, 100),
                'type' => rand(0, 1) ? 'GAP' : 'POPULAR',
                'progress' => 0
            ]);
        })->toArray();
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

    private function getEmployeesData()
    {
        // Get users with jabatan relationship
        return User::with('jabatan', 'departemen')->get()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'position' => $user->jabatan->nama_jabatan ?? 'N/A',
                'unit' => $user->departemen->nama_departemen ?? 'N/A',
                'gap' => rand(0, 3), // Mock gap data
                'readiness' => $user->score ?? 50
            ];
        })->toArray();
    }
}


