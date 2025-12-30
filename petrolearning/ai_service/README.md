# PetroLearning AI Service

Service Python untuk prediksi karir dan rekomendasi materi menggunakan FastAPI.

## Setup

### 1. Install Python Dependencies

```bash
cd ai_service
pip install -r requirements.txt
```

### 2. Run AI Service

```bash
python main.py
```

Service akan berjalan di `http://127.0.0.1:8001`

### 3. Test API

Buka browser dan akses:
- http://127.0.0.1:8001/docs (Swagger UI)
- http://127.0.0.1:8001/health (Health Check)

## Endpoints

### 1. Career Prediction (XGBoost)
**POST** `/predict/career`

Request Body:
```json
{
  "user_id": 1,
  "current_role": "Staff Process",
  "competencies": {
    "Teknis": 2,
    "K3": 3,
    "Manajemen": 1,
    "Leadership": 2
  },
  "experience_years": 3
}
```

Response:
```json
{
  "model": "XGBoost Career Predictor v1.0",
  "predictions": [
    {
      "target_role": "Supervisor Process",
      "probability": 0.75,
      "gap_analysis": {...}
    }
  ]
}
```

### 2. Course Recommendation (SVD)
**POST** `/recommend/courses`

Request Body: (sama dengan career prediction)

Response:
```json
{
  "model": "SVD Collaborative Filtering v1.0",
  "predictions": [
    {
      "course_id": 1,
      "title": "Advanced Leadership",
      "predicted_rating": 4.8,
      "category": "Leadership",
      "reason": "Meningkatkan kompetensi Leadership"
    }
  ]
}
```

## Architecture

```
Laravel Backend (Port 8000)
    ↓ HTTP Request
Python AI Service (Port 8001)
    ↓ Model Inference
Return Predictions
```

## Next Steps

1. **Train Real Models**: Ganti mock logic dengan model XGBoost dan SVD yang sesungguhnya
2. **Add Database**: Simpan hasil prediksi ke database
3. **Caching**: Implementasi Redis untuk cache prediksi
4. **Monitoring**: Tambahkan logging dan monitoring

## Notes

- Saat ini menggunakan mock data untuk development
- Model ML yang sesungguhnya akan ditambahkan setelah data training tersedia
- Service ini sudah siap untuk integrasi dengan Laravel
