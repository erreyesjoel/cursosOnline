<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar autenticación usando el helper auth() o Auth facade, ya que tengo laravel 12
        // este middleware se registrará en bootstrap/app.php
        // en versiones antiguas seria en kernel.php
        if (!Auth::check() || !Auth::user()->is_admin) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        return $next($request);
    }
}