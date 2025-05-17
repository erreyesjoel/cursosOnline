<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TestAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        dd('¡TestAuthMiddleware ejecutado!');
        return $next($request);
    }
}