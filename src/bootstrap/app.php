<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Session\Middleware\StartSession;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
                $middleware->append(StartSession::class); // <-- añade esto
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'testauth' => \App\Http\Middleware\TestAuthMiddleware::class, // <-- añade aquí tu middleware
            'auth' => \App\Http\Middleware\Authenticate::class, // <-- añade esto

        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();