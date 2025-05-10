<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CursosController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/cursos', [CursosController::class, 'mostrarCursos']);

// ruta para registro api post

Route::post('/registro', [AuthController::class, 'registro']);

// ruta login

Route::post('/login', [AuthController::class, 'login']);

// ruta logout

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Rutas protegidas para admins (con prefijo 'admin')
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/cursos', [CursosController::class, 'index']);       // GET /admin/cursos (todos los cursos)
    Route::post('/cursos', [CursosController::class, 'store']);      // POST /admin/cursos
    Route::put('/cursos/{curso}', [CursosController::class, 'update']);    // PUT /admin/cursos/{id}
    Route::delete('/cursos/{curso}', [CursosController::class, 'destroy']); // DELETE /admin/cursos/{id}
});