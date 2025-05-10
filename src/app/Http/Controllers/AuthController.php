<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'usuario' => 'required|string|max:30|unique:users,usuario',
            'correo' => 'required|email|max:100|unique:users,correo',
            'password' => [
                'required',
                'string',
                Password::min(8)  // Mínimo 8 caracteres
                    ->letters()   // Debe contener letras
                    ->mixedCase() // Debe contener mayúsculas y minúsculas
                    ->numbers(),  // Debe contener números
                'confirmed'       // Requiere password_confirmation, en plan, que las contraseñas deben coindicir si no, error
            ],
        ], [
            'password.confirmed' => 'Las contraseñas no coinciden.'
        ]);

        // Si la validación falla, devuelve los errores
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Creación del nuevo usuario
        try {
            $user = User::create([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'usuario' => $request->usuario,
                'correo' => $request->correo,
                'password' => Hash::make($request->password)
            ]);

            // Generar token de acceso
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente',
                'user' => $user->only(['id', 'nombre', 'apellido', 'usuario', 'correo']),
                'access_token' => $token,
                'token_type' => 'Bearer'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}