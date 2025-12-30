<?php

    namespace App\Http\Middleware;

    use Closure;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Symfony\Component\HttpFoundation\Response;

    class TrackUserActivity
    {
        public function handle(Request $request, Closure $next): Response
        {
            if (Auth::check()) {
                $user = Auth::user();
                // Update 'last_activity_date' ke waktu sekarang
                // Kita gunakan timestamps false agar kolom 'updated_at' tidak ikut berubah terus menerus
                $user->timestamps = false;
                $user->last_activity_date = now();
                $user->save();
            }

            return $next($request);
        }
    }