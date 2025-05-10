<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CursosController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/cursos', [CursosController::class, 'mostrarCursos']);

// ruta para registro api post

Route::post('/registro', [AuthController::class, 'registro']);

// ruta login

Route::post('/login', [AuthController::class, 'login']);