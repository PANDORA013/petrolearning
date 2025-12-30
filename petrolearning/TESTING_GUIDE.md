# 🧪 Testing Guide - Full System Integration

## ✅ Prerequisites Checklist

Before testing, ensure you have:
- [x] PHP 8.1+ installed
- [x] Composer dependencies installed
- [x] Node.js & NPM installed  
- [x] Python 3.8+ installed
- [x] Database migrated and seeded

---

## 🚀 Step-by-Step Testing

### Step 1: Reset & Seed Database

```bash
cd c:\xampp\htdocs\petrolearning\petrolearning
php artisan migrate:fresh --seed
```

**Expected Output:**
```
✓ 2025_12_30_152900_create_direktorats_table
✓ 2025_12_30_152901_create_users_table
✓ 2025_12_30_152904_create_kompartemens_table
✓ 2025_12_30_152912_create_departemens_table
✓ 2025_12_30_152930_create_bagians_table
✓ 2025_12_30_152935_create_jabatans_table
✓ 2025_12_30_152940_create_learning_materials_table
✓ 2025_12_30_155403_add_foreign_keys_to_users_table

✓ Database\Seeders\OrganizationSeeder
✓ Database\Seeders\LearningMaterialSeeder
```

**What was created:**
- 1 Direktorat (Direktorat Operasi)
- 2 Kompartemen (Produksi, QC)
- 3 Departemen (Produksi I, Produksi II, Laboratory)
- 2 Bagian (Process Unit, Chemical Analysis)
- 5 Jabatan (Staff, Supervisor, Manager, Analyst, Senior Analyst)
- 3 Users (Budi, Siti, Admin)
- 5 Learning Materials (Courses)

---

### Step 2: Start Python AI Service

**Terminal 1:**
```bash
cd c:\xampp\htdocs\petrolearning\petrolearning\ai_service
pip install -r requirements.txt
python main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Test AI Service:**
Open browser: `http://127.0.0.1:8001/docs`

You should see FastAPI Swagger UI with 4 endpoints:
- GET `/` - Service info
- POST `/predict/career` - Career predictions
- POST `/recommend/courses` - Course recommendations
- **POST `/score/courses`** - NEW! Dynamic course scoring
- GET `/health` - Health check

---

### Step 3: Start Laravel Backend

**Terminal 2:**
```bash
cd c:\xampp\htdocs\petrolearning\petrolearning
php artisan serve
```

**Expected Output:**
```
INFO  Server running on [http://127.0.0.1:8000].

Press Ctrl+C to stop the server
```

---

### Step 4: Start Vite Frontend

**Terminal 3:**
```bash
cd c:\xampp\htdocs\petrolearning\petrolearning
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

### Step 5: Test Full Flow

#### 5.1 Open Browser
Navigate to: `http://127.0.0.1:8000`

#### 5.2 Login
**Credentials:**
- Email: `budi@petro.com`
- Password: `password`

**OR**
- Email: `siti@petro.com`  
- Password: `password`

**OR (Admin)**
- Email: `admin@petro.com`
- Password: `password`

#### 5.3 Verify Dashboard

**You should see:**

1. **User Info:**
   - Name: "Budi Santoso" or "Siti Aminah"
   - Score: 100 or 120 points
   - Jabatan relation working ✓

2. **Model Switcher:**
   - Toggle between "XGBoost" and "SVD"
   - Both modes display different data

3. **Course Recommendations:**
   - 5 courses from DATABASE (not hardcoded!)
   - Each course has:
     - `xgboost_score` (20-100)
     - `svd_score` (20-100)
     - `type` ("GAP" or "POPULAR")
   - Courses sorted by active model score

4. **Career Predictions:**
   - Shows 3 target roles
   - Each with probability %
   - Gap analysis included

---

## 🔍 What to Check

### Check 1: Database Integration
**How to verify:**
1. Login to dashboard
2. Open browser DevTools (F12)
3. Go to Network tab
4. Refresh page
5. Find `dashboard` request
6. Click on it → Preview → `serverData` → `courses`

**Expected:**
- Should see 5 courses
- Titles match database (e.g., "Sertifikasi K3 Tingkat Lanjut")
- Each has `xgboost_score` and `svd_score` fields
- Scores are different each time you refresh!

### Check 2: Python AI Scoring
**How to verify:**
1. Check Terminal 1 (Python)
2. After refreshing dashboard, you should see:
   ```
   INFO:     127.0.0.1:xxxxx - "POST /score/courses HTTP/1.1" 200 OK
   ```

**If you DON'T see this:**
- Python service is not being called
- Check if service is running on port 8001
- Check Laravel logs: `storage/logs/laravel.log`

### Check 3: Dynamic Scoring
**Test randomness:**
1. Refresh dashboard 3-4 times
2. Watch course scores change
3. Note that "GAP" vs "POPULAR" labels may change
4. This proves scores come from Python, not hardcoded!

### Check 4: Fallback System
**Test graceful degradation:**
1. Stop Python service (CTRL+C in Terminal 1)
2. Refresh dashboard
3. Should still show courses but with random fallback scores
4. Check Laravel log for: "AI Scoring Service unavailable"

---

## 🐛 Troubleshooting

### Issue: Courses not showing
**Check:**
```bash
php artisan tinker
>>> \App\Models\LearningMaterial::count()
# Should return: 5
```

**Fix:**
```bash
php artisan migrate:fresh --seed
```

### Issue: Python service not responding
**Check:**
```bash
# Test health endpoint
curl http://127.0.0.1:8001/health
```

**Expected:**
```json
{
  "status": "healthy",
  "message": "AI Service is running",
  "version": "2.0.0"
}
```

**Fix:**
- Make sure Python is running on port 8001
- Check firewall settings
- Install dependencies: `pip install -r requirements.txt`

### Issue: Scores are always the same
**This means:**
- Python service not being called
- Laravel using fallback data

**Check:**
1. Open `storage/logs/laravel.log`
2. Look for: "AI Scoring Service unavailable"
3. If found, check Python service

### Issue: Login fails
**Check users:**
```bash
php artisan tinker
>>> \App\Models\User::all(['email', 'name'])
```

**Should show:**
- budi@petro.com
- siti@petro.com  
- admin@petro.com

**Reset:**
```bash
php artisan migrate:fresh --seed
```

---

## 📊 Expected Data Flow

### Full Request Cycle:

```
1. User opens /dashboard
   ↓
2. DashboardController::index()
   ↓
3. Fetch courses from database
   LearningMaterial::all()
   ↓
4. Send to Python AI
   POST http://127.0.0.1:8001/score/courses
   {
     user_profile: {...},
     courses: [{id, title, ...}, ...]
   }
   ↓
5. Python scores each course
   xgboost_score: 20-100
   svd_score: 20-100
   type: "GAP" | "POPULAR"
   ↓
6. Return to Laravel
   ↓
7. Send to React via Inertia
   ↓
8. Frontend sorts by active model
   XGBoost: sort by xgboost_score DESC
   SVD: sort by svd_score DESC
   ↓
9. Display top 5 courses
```

---

## ✅ Success Criteria

Your system is working correctly if:

- [x] Database seeded with 5 courses
- [x] Python AI service running (port 8001)
- [x] Laravel backend running (port 8000)
- [x] Vite frontend running
- [x] Can login with test users
- [x] Dashboard shows courses from database
- [x] Scores change on each refresh
- [x] Python logs show POST /score/courses requests
- [x] Model switcher changes displayed courses
- [x] System works even if Python is down (fallback)

---

## 🎯 Testing Scenarios

### Scenario 1: Happy Path
1. All services running
2. Login as Budi
3. See 5 courses with AI scores
4. Toggle XGBoost/SVD
5. Courses re-sort accordingly

### Scenario 2: Python Service Down
1. Stop Python (CTRL+C)
2. Refresh dashboard
3. Still see courses (fallback scores)
4. No errors on frontend

### Scenario 3: Different Users
1. Login as Budi (Staff Process)
2. Note courses and scores
3. Logout
4. Login as Siti (Analyst Lab)
5. Courses might have different scores (based on user profile)

### Scenario 4: Database Changes
1. Add new course via tinker:
   ```php
   LearningMaterial::create([
       'title' => 'Test Course',
       'category' => 'Test',
       'level' => 'Basic',
       'rating' => 4.5,
       'modules' => 5
   ]);
   ```
2. Refresh dashboard
3. Should see 6 courses now

---

## 📝 Notes

- **Scores are random** because AI models are not trained yet
- **This is expected behavior** - proves system is working
- Once real models are trained, scores will be predictive
- Frontend automatically handles missing data
- System degrades gracefully if services fail

---

## 🚀 Next Steps After Testing

1. ✅ Verify all tests pass
2. Train real XGBoost model for career prediction
3. Train real SVD model for course recommendation  
4. Replace mock scoring logic in Python
5. Add caching for predictions
6. Implement progress tracking
7. Add course enrollment system
8. Deploy to production

---

**Last Updated:** December 30, 2025
**Version:** 2.0.0 - Full Database Integration
