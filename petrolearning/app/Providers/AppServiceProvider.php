<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // --- LOGIKA GAMIFIKASI (DECAY SYSTEM) ---
        Schedule::call(function () {
            // 1. Tentukan batas waktu (3 hari yang lalu)
            $batasWaktu = now()->subDays(3);
            $pinalti = 5; // Poin berkurang per hari

            // 2. Cari user yang pasif & punya skor > 0
            $malasUsers = User::where('last_activity_date', '<', $batasWaktu)
                              ->where('score', '>', 0)
                              ->get();

            // 3. Eksekusi Hukuman
            foreach ($malasUsers as $user) {
                $user->decrement('score', $pinalti);
                
                // Log aktivitas pinalti
                Log::info("User {$user->name} (ID: {$user->id}) terkena pinalti skor -$pinalti. Skor sekarang: {$user->score}");
            }

            // Log summary
            if ($malasUsers->count() > 0) {
                Log::info("Decay system dijalankan: {$malasUsers->count()} user terkena pinalti.");
            }

        })->dailyAt('00:00'); // Jalankan setiap jam 12 malam
    }
}
