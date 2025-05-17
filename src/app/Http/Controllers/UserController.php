<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'No autenticado.'], 401);
        }

        return response()->json([
            'id' => $user->id,
            'usuario' => $user->usuario,
            'nombre' => $user->nombre,
            'apellido' => $user->apellido,
            'correo' => $user->correo,
            'is_admin' => $user->is_admin,
        ]);
    }
}