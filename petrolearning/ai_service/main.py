from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn
import random

app = FastAPI(title="PetroLearning AI Service", version="2.0.0")

# --- MODELS ---
class UserProfile(BaseModel):
    user_id: int
    current_role: str
    competencies: Dict[str, int]  # {"Teknis": 2, "K3": 3, ...}
    experience_years: int = 0
    last_training_date: Optional[str] = None

class Course(BaseModel):
    id: int
    title: str
    category: str
    level: str
    rating: float
    modules: int

class CourseScoreRequest(BaseModel):
    user_profile: UserProfile
    courses: List[Course]

class ScoredCourse(BaseModel):
    id: int
    title: str
    category: str
    level: str
    rating: float
    modules: int
    xgboost_score: int
    svd_score: int
    type: str  # "GAP" or "POPULAR"

class PredictionResponse(BaseModel):
    model: str
    predictions: List[Dict]

class CourseScoreResponse(BaseModel):
    model: str
    courses: List[ScoredCourse]

# --- ENDPOINTS ---
@app.get("/")
def root():
    return {
        "service": "PetroLearning AI Service",
        "status": "running",
        "version": "2.0.0",
        "models": ["xgboost_career", "svd_recommendation", "course_scorer"]
    }

@app.post("/predict/career", response_model=PredictionResponse)
def predict_career(profile: UserProfile):
    """
    Prediksi peluang promosi ke jabatan tertentu (Mock XGBoost).
    Nanti diganti dengan model ML yang sudah di-train.
    """
    # Mock logic: Hitung score berdasarkan kompetensi
    avg_competency = sum(profile.competencies.values()) / len(profile.competencies) if profile.competencies else 0
    
    roles = ["Supervisor Process", "Senior Analyst", "Manager Process"]
    predictions = []
    
    for role in roles[:3]:  # Top 3 prediksi
        # Mock probability (nanti dari model XGBoost)
        probability = min(0.95, (avg_competency / 4) * 0.85 + (profile.experience_years * 0.03))
        probability += random.uniform(-0.1, 0.1)  # Add randomness
        probability = max(0.3, min(0.95, probability))
        
        predictions.append({
            "target_role": role,
            "probability": round(probability, 2),
            "gap_analysis": {
                "required_competencies": ["Teknis: Level 4", "Leadership: Level 3"],
                "current_status": f"Teknis: Level {profile.competencies.get('Teknis', 0)}"
            }
        })
    
    return PredictionResponse(
        model="XGBoost Career Predictor v2.0",
        predictions=predictions
    )

@app.post("/recommend/courses", response_model=PredictionResponse)
def recommend_courses(profile: UserProfile):
    """
    Rekomendasi materi training (Mock SVD/Collaborative Filtering).
    Nanti diganti dengan model SVD yang sudah di-train.
    """
    # Mock logic: Rekomendasikan course berdasarkan kompetensi terlemah
    weakest_competency = min(profile.competencies, key=profile.competencies.get) if profile.competencies else "Teknis"
    
    course_titles = [
        "Advanced Leadership", "K3 Fundamental", "Process Optimization",
        "Data Analysis for Managers", "Chemical Analysis Training"
    ]
    
    recommendations = []
    for i, title in enumerate(course_titles[:3]):  # Top 3 rekomendasi
        # Mock score (nanti dari model SVD)
        score = round(4.5 + random.uniform(-0.3, 0.5), 1)
        
        recommendations.append({
            "course_id": 100 + i,
            "title": title,
            "predicted_rating": score,
            "category": random.choice(["Leadership", "Teknis", "K3", "Manajemen"]),
            "reason": f"Meningkatkan kompetensi {weakest_competency}"
        })
    
    return PredictionResponse(
        model="SVD Collaborative Filtering v2.0",
        predictions=recommendations
    )

@app.post("/score/courses", response_model=CourseScoreResponse)
def score_courses(request: CourseScoreRequest):
    """
    NEW ENDPOINT: Terima daftar kursus dari Laravel, beri skor XGBoost dan SVD.
    Ini adalah endpoint utama untuk integrasi penuh dengan database.
    """
    user = request.user_profile
    courses = request.courses
    
    scored_courses = []
    
    for course in courses:
        # --- XGBoost Score Logic (Mock) ---
        # Skor tinggi jika:
        # - Level Advanced dan user punya gap kompetensi
        # - Category match dengan competency yang lemah
        xgboost_score = 50  # Base score
        
        # Boost if Advanced level
        if course.level == "Advanced":
            xgboost_score += 20
        elif course.level == "Intermediate":
            xgboost_score += 10
        
        # Boost if high rating
        xgboost_score += int(course.rating * 5)
        
        # Add randomness
        xgboost_score += random.randint(-10, 15)
        xgboost_score = max(20, min(100, xgboost_score))
        
        # --- SVD Score Logic (Mock) ---
        # Skor tinggi jika:
        # - Rating tinggi
        # - Banyak modules (comprehensive)
        svd_score = int(course.rating * 15)  # Base from rating
        svd_score += course.modules * 2  # More modules = better
        svd_score += random.randint(-10, 15)
        svd_score = max(20, min(100, svd_score))
        
        # --- Determine Type ---
        # "GAP" jika XGBoost score tinggi (fokus gap closing)
        # "POPULAR" jika SVD score tinggi (populer)
        course_type = "GAP" if xgboost_score > svd_score else "POPULAR"
        
        scored_courses.append(ScoredCourse(
            id=course.id,
            title=course.title,
            category=course.category,
            level=course.level,
            rating=course.rating,
            modules=course.modules,
            xgboost_score=xgboost_score,
            svd_score=svd_score,
            type=course_type
        ))
    
    return CourseScoreResponse(
        model="Hybrid XGBoost + SVD Scorer v1.0",
        courses=scored_courses
    )

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "AI Service is running", "version": "2.0.0"}

# --- RUN SERVER ---
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
