from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import uvicorn

app = FastAPI(title="PetroLearning AI Service", version="1.0.0")

# --- MODELS ---
class UserProfile(BaseModel):
    user_id: int
    current_role: str
    competencies: Dict[str, int]  # {"Teknis": 2, "K3": 3, ...}
    experience_years: int = 0
    last_training_date: str = None

class PredictionResponse(BaseModel):
    model: str
    predictions: List[Dict]

# --- MOCK DATA (Nanti diganti dengan model ML yang sesungguhnya) ---
MOCK_ROLES = [
    "Staff Process", "Staff Lab", "Supervisor Process", 
    "Supervisor Lab", "Manager HR", "Manager Operations"
]

MOCK_COURSES = [
    {"id": 1, "title": "Advanced Leadership", "rating": 4.8, "category": "Leadership"},
    {"id": 2, "title": "K3 Fundamental", "rating": 4.7, "category": "K3"},
    {"id": 3, "title": "Process Optimization", "rating": 4.6, "category": "Teknis"},
    {"id": 4, "title": "Data Analysis for Managers", "rating": 4.5, "category": "Manajemen"},
]

# --- ENDPOINTS ---
@app.get("/")
def root():
    return {
        "service": "PetroLearning AI Service",
        "status": "running",
        "models": ["xgboost_career", "svd_recommendation"]
    }

@app.post("/predict/career", response_model=PredictionResponse)
def predict_career(profile: UserProfile):
    """
    Prediksi peluang promosi ke jabatan tertentu (Mock XGBoost).
    Nanti diganti dengan model ML yang sudah di-train.
    """
    # Mock logic: Hitung score berdasarkan kompetensi
    avg_competency = sum(profile.competencies.values()) / len(profile.competencies) if profile.competencies else 0
    
    predictions = []
    for role in MOCK_ROLES[:3]:  # Top 3 prediksi
        # Mock probability (nanti dari model XGBoost)
        probability = min(0.95, (avg_competency / 4) * 0.85 + (profile.experience_years * 0.03))
        
        predictions.append({
            "target_role": role,
            "probability": round(probability, 2),
            "gap_analysis": {
                "required_competencies": ["Teknis: Level 4", "Leadership: Level 3"],
                "current_status": f"Teknis: Level {profile.competencies.get('Teknis', 0)}"
            }
        })
    
    return PredictionResponse(
        model="XGBoost Career Predictor v1.0",
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
    
    recommendations = []
    for course in MOCK_COURSES[:3]:  # Top 3 rekomendasi
        # Mock score (nanti dari model SVD)
        score = round(4.5 + (hash(course["title"] + str(profile.user_id)) % 5) / 10, 1)
        
        recommendations.append({
            "course_id": course["id"],
            "title": course["title"],
            "predicted_rating": score,
            "category": course["category"],
            "reason": f"Meningkatkan kompetensi {weakest_competency}"
        })
    
    return PredictionResponse(
        model="SVD Collaborative Filtering v1.0",
        predictions=recommendations
    )

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "AI Service is running"}

# --- RUN SERVER ---
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
