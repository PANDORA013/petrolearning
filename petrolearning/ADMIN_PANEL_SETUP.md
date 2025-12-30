# Admin Panel Setup Guide (STEP 5)
## PetroLearning LMS - FilamentPHP v4.0 Admin Interface

**Created:** December 31, 2025  
**Status:** ✅ COMPLETE  
**Technology:** FilamentPHP v4.0 on Laravel 11

---

## 📋 Table of Contents

1. [Installation Overview](#installation-overview)
2. [Admin Panel Access](#admin-panel-access)
3. [Resources Overview](#resources-overview)
4. [Learning Materials Management](#learning-materials-management)
5. [User Management & Gamification Monitoring](#user-management--gamification-monitoring)
6. [Position Management](#position-management)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Installation Overview

### Packages Installed

```bash
# FilamentPHP v4.0 (Laravel 11 compatible)
composer require filament/filament:"^4.0" --ignore-platform-req=ext-intl -W

# Installed dependencies (33 packages):
- filament/filament v4.0.0
- filament/support v4.0.0
- filament/actions v4.0.0
- filament/forms v4.0.0
- filament/tables v4.0.0
- filament/widgets v4.0.0
- filament/notifications v4.0.0
- filament/infolists v4.0.0
- livewire/livewire v3.7.3
- blade-ui-kit/blade-heroicons v2.6.0
- + 23 other dependencies
```

### Panel Installation

```bash
php artisan filament:install --panels
# Created: app/Providers/Filament/AdminPanelProvider.php
# Registered in: bootstrap/providers.php
```

### Admin User Creation

```bash
php artisan make:filament-user

# Credentials:
Name: thomas
Email: thomaslindung@gmail.com
Password: [set during creation]
```

---

## 🔐 Admin Panel Access

### URL
```
http://localhost/admin/login
```

### Login Credentials
- **Email:** thomaslindung@gmail.com
- **Password:** [password set during user creation]

### First Login Steps
1. Navigate to `http://localhost/admin/login`
2. Enter email and password
3. Access admin dashboard
4. Navigate to Resources:
   - Learning Materials
   - Users
   - Positions

---

## 📦 Resources Overview

### Generated Resources

1. **LearningMaterialResource** (Priority 1)
   - Path: `app/Filament/Resources/LearningMaterials/`
   - Purpose: Manage courses, upload materials
   - Icon: 📚 Rectangle Stack
   - Navigation Sort: 1

2. **UserResource** (Priority 2)
   - Path: `app/Filament/Resources/Users/`
   - Purpose: Monitor users, track gamification
   - Icon: 👥 Users
   - Navigation Sort: 2

3. **JabatanResource** (Priority 3)
   - Path: `app/Filament/Resources/Jabatans/`
   - Purpose: Manage positions/roles
   - Icon: 💼 Briefcase
   - Navigation Sort: 3

---

## 📚 Learning Materials Management

### Form Features

#### Section 1: Course Information
```php
- Title: Text input (required, max 255 chars)
  Example: "Advanced React Patterns"

- Category: Select dropdown (required)
  Options:
  ✓ Technical
  ✓ Safety
  ✓ Operations
  ✓ Management
  ✓ Soft Skills

- Level: Select dropdown (required)
  Options:
  ✓ Beginner (green badge)
  ✓ Intermediate (orange badge)
  ✓ Advanced (red badge)

- Description: Textarea (max 1000 chars, full width)
  Placeholder: "Brief description of what this course covers..."
```

#### Section 2: Course Details
```php
- Modules: Numeric input (required, min 1, max 100)
  Default: 1

- Duration: Text input
  Example: "2 hours", "3 days"

- Rating: Numeric input (0-5 with 0.1 step)
  Display: "X.X / 5"
  Default: 0
```

#### Section 3: Competency Target
```php
- Target Competency: Select dropdown (searchable)
  Options:
  ✓ Technical Excellence
  ✓ Safety Awareness
  ✓ Operational Efficiency
  ✓ Leadership
  ✓ Communication
  ✓ Problem Solving
```

### Table Features

#### Columns
```
┌──────────────┬──────────┬───────────┬─────────┬────────┬─────────┐
│ Course Title │ Category │ Level     │ Rating  │ Modules│ Duration│
├──────────────┼──────────┼───────────┼─────────┼────────┼─────────┤
│ Bold text    │ Badge    │ Badge     │ X.X ⭐  │ X mod  │ Text    │
│ Searchable   │ Colored  │ Colored   │ Sortable│ Sort   │ Toggle  │
└──────────────┴──────────┴───────────┴─────────┴────────┴─────────┘
```

#### Badge Colors
- **Category:**
  - Technical → Blue (info)
  - Safety → Red (danger)
  - Operations → Yellow (warning)
  - Management → Green (success)
  - Soft Skills → Gray

- **Level:**
  - Beginner → Green (success)
  - Intermediate → Yellow (warning)
  - Advanced → Red (danger)

#### Filters
```php
1. Category Filter
   - Technical
   - Safety
   - Operations
   - Management
   - Soft Skills

2. Level Filter
   - Beginner
   - Intermediate
   - Advanced
```

#### Actions
- **Edit:** Modify course details
- **Delete:** Remove course (with confirmation)
- **Bulk Delete:** Delete multiple courses

#### Default Sorting
- Created at (newest first)

### Usage Examples

#### Creating a New Course
```
1. Click "New Learning Material" button
2. Fill Course Information:
   - Title: "Python for Data Analysis"
   - Category: Technical
   - Level: Intermediate
   - Description: "Learn pandas, numpy, and data visualization..."
3. Set Course Details:
   - Modules: 12
   - Duration: "6 weeks"
   - Rating: 4.5
4. Select Competency Target:
   - Technical Excellence
5. Click "Create"
```

---

## 👥 User Management & Gamification Monitoring

### Form Features

#### Section 1: User Information
```php
- Full Name: Text input (required, max 255)
- Email: Email input (required, unique)
- Password: Password input
  - Required only on create
  - Auto-hashed with bcrypt
  - Placeholder: "Leave blank to keep current password"
```

#### Section 2: Organization
```php
- Position (Jabatan): Select dropdown
  - Relationship with Jabatan model
  - Searchable, preloaded
  - Display: nama_jabatan

- Department: Select dropdown
  - Relationship with Departemen model
  - Searchable, preloaded
  - Display: nama_departemen
```

#### Section 3: Gamification Stats (Collapsible)
```php
- Gamification Score: Numeric input
  - Default: 100
  - Min: 0
  - Display: "X points"
  - Helper: "User gamification score (affected by activity tracking)"

- Last Activity: DateTime picker
  - Auto-updated by middleware
  - Helper: "Auto-updated on each user activity"

- Email Verified At: DateTime picker
```

### Table Features - GAMIFICATION MONITORING

#### Main Columns
```
┌─────────┬─────────┬──────────┬────────────┬───────┬─────────────┐
│ Name    │ Email   │ Position │ Department │ Score │ Last Active │
├─────────┼─────────┼──────────┼────────────┼───────┼─────────────┤
│ Bold    │ Copy    │ Badge    │ Badge      │ Badge │ Time ago    │
│ Search  │ Icon    │ Blue     │ Yellow     │ Tier  │ Icon status │
└─────────┴─────────┴──────────┴────────────┴───────┴─────────────┘
```

#### Score Column - TIER SYSTEM
```php
Display: "X pts"
Badge Color:
├─ 200+ pts → GREEN (Platinum Tier) 🏆
├─ 150-199  → BLUE (Gold Tier) 🥇
├─ 100-149  → YELLOW (Silver Tier) 🥈
└─ <100     → RED (Bronze Tier) 🥉

Description (below badge):
"🏆 Platinum" / "🥇 Gold" / "🥈 Silver" / "🥉 Bronze"
```

#### Last Activity Column - ACTIVITY STATUS
```php
Display: "X days ago" (relative time)
Color:
├─ Active (< 3 days) → GREEN with ✓ icon
└─ Inactive (3+ days) → RED with ⚠️ icon

This column monitors decay system status!
Users shown in RED will get -5 points at 00:00 daily.
```

#### Filters - MONITORING TOOLS

**1. Position Filter**
```php
- Relationship-based filter
- Shows all jabatan options
- Filter users by position
```

**2. Department Filter**
```php
- Relationship-based filter
- Shows all departemen options
- Filter users by department
```

**3. Tier Filter** (Gamification Score)
```php
Options:
├─ Platinum (200+)    → score >= 200
├─ Gold (150-199)     → score 150-199
├─ Silver (100-149)   → score 100-149
└─ Bronze (<100)      → score < 100

Use this to find struggling users!
```

#### Actions
- **View:** View user details (read-only page)
- **Edit:** Modify user data
- **Delete:** Remove user (with confirmation)

#### Default Sorting
- Score (highest first) - **Leaderboard style!**

### Gamification Monitoring Examples

#### Finding Inactive Users
```
1. Go to Users resource
2. Look at "Last Active" column
3. Red entries with ⚠️ icon = 3+ days inactive
4. These users will get -5 points tonight at 00:00
5. Consider sending reminder emails
```

#### Monitoring Top Performers
```
1. Table is sorted by score (descending)
2. Top rows = highest scores
3. Look for GREEN badges (Platinum tier)
4. These are your star learners!
```

#### Finding Struggling Learners
```
1. Use "Tier" filter
2. Select "Bronze (<100)"
3. View users with low scores
4. Check their last activity
5. Provide coaching/support
```

#### Tracking Department Performance
```
1. Use "Department" filter
2. Select target department
3. Check average score distribution
4. Identify departments needing training
```

---

## 💼 Position Management

### Form Features
```php
- Auto-generated form based on Jabatan model
- Fields:
  ✓ nama_jabatan (Position name)
  ✓ kompartemen_id (Compartment relation)
  ✓ bagian_id (Section relation)
  ✓ timestamps
```

### Table Features
```php
- Columns: nama_jabatan, kompartemen, bagian
- Searchable by position name
- Sortable
- Edit/Delete actions
- View page enabled
```

---

## 🧪 Testing Guide

### Test 1: Admin Login
```bash
1. Navigate to: http://localhost/admin/login
2. Enter credentials:
   Email: thomaslindung@gmail.com
   Password: [your password]
3. Should redirect to: /admin (dashboard)
4. Verify navigation menu shows:
   - Learning Materials
   - Users
   - Positions
```

### Test 2: Create Learning Material
```bash
1. Click "Learning Materials" in sidebar
2. Click "New Learning Material" button
3. Fill form:
   Title: "Test Course"
   Category: Technical
   Level: Beginner
   Description: "Test description"
   Modules: 5
   Duration: "1 week"
   Rating: 4.0
   Competency: Technical Excellence
4. Click "Create"
5. Verify: Course appears in table
6. Verify: Badge colors correct
7. Verify: Rating shows "4.0 ⭐"
```

### Test 3: Monitor User Gamification
```bash
1. Click "Users" in sidebar
2. Check table display:
   ✓ Score badges show correct tier
   ✓ Last Activity shows time ago
   ✓ Inactive users (3+ days) show red icon
3. Test filters:
   - Filter by Tier: "Bronze (<100)"
   - Should show only low-score users
4. Test sorting:
   - Should default to highest score first
5. Click "View" on a user
   - Verify infolist page shows all details
```

### Test 4: Edit User Score
```bash
1. In Users table, click "Edit" on test user
2. Navigate to "Gamification Stats" section
3. Change score:
   - 250 → Should show Platinum on save
   - 175 → Should show Gold on save
   - 120 → Should show Silver on save
   - 50 → Should show Bronze on save
4. Verify badge color changes after save
```

### Test 5: Verify Decay System Integration
```bash
1. Find a user with Last Activity > 3 days
   - Should show RED icon with ⚠️
2. Note their current score
3. Wait until next day (after 00:00)
4. Check user again
5. Score should be: previous_score - 5
6. Verify in logs:
   tail -f storage/logs/laravel.log
   Should show: "User {name} terkena pinalti..."
```

### Test 6: Relationship Filters
```bash
1. Create test data:
   - 3 jabatan (positions)
   - 2 departemen (departments)
   - 5 users with different jabatan/departemen
2. Go to Users table
3. Test Position filter:
   - Select "Manager"
   - Should show only managers
4. Test Department filter:
   - Select "IT Department"
   - Should show only IT users
5. Combine filters:
   - Position: Manager
   - Department: IT
   - Should show IT Managers only
```

---

## 🔧 Troubleshooting

### Issue 1: "ext-intl extension missing"
**Solution:**
```bash
# Option A: Enable in php.ini
1. Open C:\xampp\php\php.ini
2. Find: ;extension=intl
3. Change to: extension=intl
4. Restart Apache

# Option B: Ignore platform requirement (used during install)
composer require filament/filament --ignore-platform-req=ext-intl
```

### Issue 2: "Class 'Section' not found"
**Problem:** Wrong namespace for Section component in Forms

**Solution:**
```php
# WRONG:
use Filament\Forms\Components\Section;

# CORRECT:
use Filament\Schemas\Components\Section;
```

### Issue 3: Login page not loading
**Problem:** AdminPanelProvider not registered

**Solution:**
```bash
# Check bootstrap/providers.php
App\Providers\Filament\AdminPanelProvider::class,

# If missing, add manually or reinstall:
php artisan filament:install --panels
```

### Issue 4: Assets not loading (CSS/JS)
**Solution:**
```bash
# Clear cache
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# Republish assets
php artisan filament:assets
```

### Issue 5: Score badge not showing correct color
**Problem:** Tier logic incorrect

**Check logic in UsersTable.php:**
```php
->color(fn (int $state): string => match (true) {
    $state >= 200 => 'success',  // Platinum
    $state >= 150 => 'info',     // Gold
    $state >= 100 => 'warning',  // Silver
    default => 'danger',         // Bronze
})
```

### Issue 6: Last Activity not auto-updating
**Problem:** Middleware not running

**Solution:**
```bash
# Check bootstrap/app.php
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        \App\Http\Middleware\TrackUserActivity::class,
    ]);
})

# Verify middleware exists:
ls app/Http/Middleware/TrackUserActivity.php
```

### Issue 7: Relationships not loading in form
**Problem:** Model relationships not defined

**Solution:**
```php
# In User model:
public function jabatan() {
    return $this->belongsTo(Jabatan::class);
}

public function departemen() {
    return $this->belongsTo(Departemen::class);
}
```

---

## 📊 Admin Panel Features Summary

### Learning Materials
✅ Beautiful form with sections  
✅ Category & level with colored badges  
✅ Rating display with stars  
✅ Filters for category & level  
✅ Searchable & sortable table  
✅ CRUD operations  

### Users (Gamification Hub)
✅ Tier system visualization (Bronze/Silver/Gold/Platinum)  
✅ Score badges with colors  
✅ Last activity monitoring  
✅ Inactive user detection (3+ days)  
✅ Department & Position filters  
✅ Tier filter for finding struggling learners  
✅ Leaderboard-style sorting (highest score first)  
✅ View/Edit/Delete operations  
✅ Relationship display (jabatan, departemen)  

### Positions
✅ Auto-generated CRUD  
✅ View page enabled  
✅ Relationship with kompartemen & bagian  

---

## 🎯 Next Steps

1. **Production Deployment:**
   ```bash
   # Update .env for production
   APP_ENV=production
   APP_DEBUG=false
   
   # Setup proper database (MySQL)
   DB_CONNECTION=mysql
   
   # Run migrations
   php artisan migrate --force
   ```

2. **Security Hardening:**
   - Enable 2FA for admin users
   - Setup rate limiting
   - Configure HTTPS
   - Setup backup system

3. **Additional Features:**
   - User import/export (CSV/Excel)
   - Bulk score updates
   - Email notifications for inactive users
   - Dashboard widgets (stats overview)
   - Activity logs (audit trail)

4. **Testing Gamification:**
   - Follow GAMIFICATION_SYSTEM.md
   - Test decay system at 00:00
   - Verify score calculations
   - Monitor user engagement

---

## 📝 File Structure

```
app/
├── Filament/
│   ├── Resources/
│   │   ├── LearningMaterials/
│   │   │   ├── LearningMaterialResource.php
│   │   │   ├── Pages/
│   │   │   │   ├── CreateLearningMaterial.php
│   │   │   │   ├── EditLearningMaterial.php
│   │   │   │   └── ListLearningMaterials.php
│   │   │   ├── Schemas/
│   │   │   │   └── LearningMaterialForm.php
│   │   │   └── Tables/
│   │   │       └── LearningMaterialsTable.php
│   │   ├── Users/
│   │   │   ├── UserResource.php
│   │   │   ├── Pages/
│   │   │   │   ├── CreateUser.php
│   │   │   │   ├── EditUser.php
│   │   │   │   ├── ListUsers.php
│   │   │   │   └── ViewUser.php
│   │   │   ├── Schemas/
│   │   │   │   ├── UserForm.php
│   │   │   │   └── UserInfolist.php
│   │   │   └── Tables/
│   │   │       └── UsersTable.php
│   │   └── Jabatans/
│   │       ├── JabatanResource.php
│   │       ├── Pages/
│   │       ├── Schemas/
│   │       └── Tables/
│   └── Providers/
│       └── AdminPanelProvider.php
└── Providers/
    └── Filament/
        └── AdminPanelProvider.php
```

---

## ✨ Key Achievements

✅ FilamentPHP v4.0 successfully installed on Laravel 11  
✅ Admin panel accessible at /admin/login  
✅ Admin user created and tested  
✅ 3 resources generated and customized  
✅ Learning Materials with beautiful form UI  
✅ User management with gamification monitoring  
✅ Score tier system (Bronze/Silver/Gold/Platinum)  
✅ Inactive user detection (3+ days)  
✅ Relationship filters (position, department, tier)  
✅ Badge colors for visual feedback  
✅ Leaderboard-style user listing  
✅ Integration with existing gamification system  

**STEP 5: COMPLETE! 🎉**

---

**Documentation Version:** 1.0  
**Last Updated:** December 31, 2025  
**Author:** GitHub Copilot + thomas  
**Project:** PetroLearning LMS
