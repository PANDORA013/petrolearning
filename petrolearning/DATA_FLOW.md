# 🔄 Data Flow Architecture - PetroLearning

## Overview
Dokumentasi ini menjelaskan bagaimana data mengalir dari database → backend (Laravel) → AI Service (Python) → frontend (React).

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                    (React Dashboard.jsx)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Request
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LARAVEL BACKEND                               │
│              (DashboardController.php)                           │
│                                                                   │
│  1. Get user data from database                                  │
│  2. Prepare user profile payload                                 │
│  3. Call Python AI Service ──────────┐                          │
│  4. Get mock data from helpers       │                          │
│  5. Combine all data                 │                          │
│  6. Send to Inertia                  │                          │
└──────────────────────────────────────┼──────────────────────────┘
                                       │
                                       │ HTTP POST
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PYTHON AI SERVICE                               │
│                  (FastAPI - Port 8001)                           │
│                                                                   │
│  Endpoints:                                                      │
│  • POST /predict/career      → XGBoost predictions              │
│  • POST /recommend/courses   → SVD recommendations              │
│                                                                   │
│  Returns JSON with predictions                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Steps

### 1. User Access Dashboard

**URL:** `http://127.0.0.1:8000/dashboard`

**Route:** `routes/web.php`
```php
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
```

### 2. Laravel Controller Processing

**File:** `app/Http/Controllers/DashboardController.php`

**Method:** `index(Request $request)`

#### Step 2.1: Get User Data
```php
$user = $request->user();
```

#### Step 2.2: Prepare User Profile
```php
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
```

#### Step 2.3: Call Python AI Service
```php
// Career Predictions (XGBoost)
$careerPredictions = $this->getCareerPredictions($userProfile);

// Course Recommendations (SVD)
$courseRecommendations = $this->getCourseRecommendations($userProfile);
```

**API Calls:**
- **POST** `http://127.0.0.1:8001/predict/career`
- **POST** `http://127.0.0.1:8001/recommend/courses`

#### Step 2.4: Get Mock Data
```php
$serverData = [
    'stats' => [...],
    'courses' => $this->getMockCourses(),
    'employees' => $this->getMockEmployees(),
];
```

#### Step 2.5: Send to Frontend
```php
return Inertia::render('Dashboard', [
    'aiData' => [
        'career_predictions' => $careerPredictions,
        'course_recommendations' => $courseRecommendations
    ],
    'serverData' => $serverData
]);
```

### 3. Python AI Service Processing

**File:** `ai_service/main.py`

#### Endpoint 1: Career Prediction
```python
@app.post("/predict/career")
def predict_career(profile: UserProfile):
    # Process user profile
    # Calculate probability using XGBoost (currently mock)
    # Return predictions
    return {
        "model": "XGBoost Career Predictor v1.0",
        "predictions": [...]
    }
```

#### Endpoint 2: Course Recommendation
```python
@app.post("/recommend/courses")
def recommend_courses(profile: UserProfile):
    # Process user profile
    # Calculate scores using SVD (currently mock)
    # Return recommendations
    return {
        "model": "SVD Collaborative Filtering v1.0",
        "predictions": [...]
    }
```

### 4. Frontend (React) Rendering

**File:** `resources/js/Pages/Dashboard.jsx`

#### Step 4.1: Receive Props
```jsx
export default function Dashboard({ auth, aiData, serverData }) {
  // Extract data from props
  const EMPLOYEES = serverData?.employees || [...fallback];
  const COURSES = serverData?.courses || [...fallback];
  const careerPredictions = aiData?.career_predictions?.predictions || [];
  const courseRecommendations = aiData?.course_recommendations?.predictions || [];
}
```

#### Step 4.2: Process Recommendations
```jsx
// Sort courses by AI scores
const recommendations = activeModel === 'XGBoost' 
  ? COURSES.filter(c => c.progress === 0)
      .sort((a, b) => (b.xgboost_score || 0) - (a.xgboost_score || 0))
      .slice(0, 5)
  : COURSES.filter(c => c.progress === 0)
      .sort((a, b) => (b.svd_score || 0) - (a.svd_score || 0))
      .slice(0, 5);
```

#### Step 4.3: Render UI
```jsx
return (
  <div>
    {/* Display career predictions */}
    {careerPredictions.map(prediction => ...)}
    
    {/* Display course recommendations */}
    {recommendations.map(course => ...)}
  </div>
);
```

## Data Structures

### Course Object
```javascript
{
  id: 101,
  title: 'Sertifikasi K3 Tingkat Lanjut',
  category: 'Safety',
  level: 'Advanced',
  progress: 0,
  modules: 12,
  rating: 4.8,
  type: 'GAP',
  xgboost_score: 95,  // AI score from XGBoost
  svd_score: 70        // AI score from SVD
}
```

### Employee Object
```javascript
{
  id: 1,
  name: 'Budi Santoso',
  position: 'Staff Process',
  unit: 'Produksi I',
  gap: 2,
  readiness: 45
}
```

### Career Prediction Object
```javascript
{
  target_role: 'Supervisor Process',
  probability: 0.75,
  gap_analysis: {
    required_competencies: ['Teknis: Level 4', 'Leadership: Level 3'],
    current_status: 'Teknis: Level 2'
  }
}
```

### Course Recommendation Object
```javascript
{
  course_id: 1,
  title: 'Advanced Leadership',
  predicted_rating: 4.8,
  category: 'Leadership',
  reason: 'Meningkatkan kompetensi Leadership'
}
```

## Error Handling & Fallbacks

### 1. AI Service Unavailable
```php
try {
    $response = Http::timeout(5)->post('http://127.0.0.1:8001/predict/career', $userProfile);
    if ($response->successful()) {
        return $response->json();
    }
} catch (\Exception $e) {
    Log::warning('AI Service unavailable: ' . $e->getMessage());
}

// Return fallback data
return [...];
```

### 2. Missing Backend Data
```jsx
// Frontend automatically uses fallback if data is missing
const COURSES = serverData?.courses || [
  // Fallback data
];
```

### 3. No User Jabatan
```php
'current_role' => $user->jabatan->nama_jabatan ?? 'Staff',
```

## Performance Considerations

### 1. HTTP Timeout
- AI service calls have 5-second timeout
- Prevents blocking if Python service is slow

### 2. Data Caching (TODO)
- Cache AI predictions for 1 hour
- Reduce load on Python service

### 3. Lazy Loading (TODO)
- Load recommendations on-demand
- Improve initial page load

## Next Steps

### Phase 1: Real ML Models
- [ ] Train XGBoost model on real data
- [ ] Train SVD model on user-course interactions
- [ ] Replace mock logic in Python service

### Phase 2: Database Integration
- [ ] Store competencies in database
- [ ] Save predictions history
- [ ] Track user progress on courses

### Phase 3: Real-time Updates
- [ ] WebSocket for live predictions
- [ ] Push notifications for new recommendations
- [ ] Real-time dashboard updates

### Phase 4: Optimization
- [ ] Redis caching for predictions
- [ ] Database query optimization
- [ ] Frontend code splitting

## Testing

### 1. Test AI Service
```bash
cd ai_service
python main.py
# Visit http://127.0.0.1:8001/docs
```

### 2. Test Backend
```bash
php artisan serve
# Visit http://127.0.0.1:8000/dashboard
```

### 3. Test Full Flow
```bash
# Terminal 1: Python AI
cd ai_service && python main.py

# Terminal 2: Laravel
php artisan serve

# Terminal 3: Vite
npm run dev

# Browser: http://127.0.0.1:8000
```

## Troubleshooting

### Issue: AI predictions not showing
**Check:**
1. Is Python service running on port 8001?
2. Check Laravel logs: `storage/logs/laravel.log`
3. Check browser console for errors

### Issue: Courses not displaying
**Check:**
1. Is serverData.courses being passed?
2. Check Inertia response in browser DevTools
3. Verify DashboardController return statement

### Issue: Scores showing as 0
**Check:**
1. Course objects have xgboost_score and svd_score
2. Sort logic is correct in Dashboard.jsx
3. AI service returning scores in response

## Contributors
- Backend: Laravel Team
- AI Service: Python/ML Team
- Frontend: React Team

## Last Updated
December 30, 2025
