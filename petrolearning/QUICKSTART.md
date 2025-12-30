# 🚀 PetroLearning - Quick Start Guide

## Prerequisites
- ✅ PHP 8.1+
- ✅ Composer
- ✅ Node.js & NPM
- ✅ Python 3.8+
- ✅ SQLite (atau MySQL/PostgreSQL)

## 📦 Installation

### 1. Install PHP Dependencies
```bash
composer install
```

### 2. Install JavaScript Dependencies
```bash
npm install
```

### 3. Install Python Dependencies
```bash
cd ai_service
pip install -r requirements.txt
cd ..
```

### 4. Setup Environment
```bash
# Copy .env file
cp .env.example .env

# Generate app key
php artisan key:generate
```

### 5. Setup Database
```bash
# Create SQLite database
New-Item -Path database/database.sqlite -ItemType File

# Run migrations
php artisan migrate:fresh
```

## 🎯 Running the Application

### Terminal 1: Laravel Backend
```bash
php artisan serve
```
Server akan berjalan di `http://127.0.0.1:8000`

### Terminal 2: Vite Frontend
```bash
npm run dev
```

### Terminal 3: Python AI Service
```bash
cd ai_service
python main.py
```
AI Service akan berjalan di `http://127.0.0.1:8001`

## 🧪 Testing

### 1. Buat User Test
```bash
php artisan tinker
```
```php
$user = App\Models\User::create([
    'name' => 'Test User',
    'email' => 'test@petrolearning.com',
    'password' => bcrypt('password'),
    'score' => 100
]);
```

### 2. Login ke Aplikasi
- Buka browser: `http://127.0.0.1:8000`
- Login dengan: `test@petrolearning.com` / `password`

### 3. Test AI Service
Buka browser: `http://127.0.0.1:8001/docs` untuk melihat API documentation (Swagger UI)

## 📂 Project Structure

```
petrolearning/
├── ai_service/              # Python FastAPI AI Service
│   ├── main.py             # AI endpoints (XGBoost, SVD)
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # AI service documentation
├── app/
│   ├── Http/Controllers/
│   │   └── DashboardController.php  # Calls Python AI service
│   └── Models/             # Eloquent models
│       ├── Direktorat.php
│       ├── Kompartemen.php
│       ├── Departemen.php
│       ├── Bagian.php
│       └── Jabatan.php
├── database/
│   └── migrations/         # Database schema
├── resources/
│   └── js/Pages/
│       └── Dashboard.jsx   # React dashboard UI
└── routes/
    └── web.php             # Laravel routes
```

## 🔧 Troubleshooting

### AI Service tidak bisa dipanggil
- Pastikan Python service running di port 8001
- Cek firewall settings
- Lihat log di `storage/logs/laravel.log`

### Database error
```bash
# Reset database
php artisan migrate:fresh
```

### Frontend tidak reload
```bash
# Restart Vite
npm run dev
```

## 🎨 Features

### ✅ Sudah Implementasi:
- [x] Hierarchical organizational structure (Direktorat → Kompartemen → Departemen → Bagian → Jabatan)
- [x] User gamification system (score, last_activity_date)
- [x] Python AI Service (FastAPI)
- [x] Career prediction endpoint (XGBoost mock)
- [x] Course recommendation endpoint (SVD mock)
- [x] Laravel-Python HTTP integration
- [x] React dashboard with real-time data
- [x] Model switcher (XGBoost/SVD)

### 🚧 Next Steps:
- [ ] Train real ML models (XGBoost & SVD)
- [ ] Add seeder for dummy data
- [ ] Implement CRUD for organizational data
- [ ] Add authentication & authorization
- [ ] Implement score decay system
- [ ] Add more visualizations (charts)
- [ ] Deploy to production

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software.

## 👥 Team

- Development Team: PETRO Learning
- Contact: info@petrolearning.com
