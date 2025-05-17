<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'usuario' => 'required|string|max:30|unique:users,usuario',
            'correo' => 'required|email|max:100|unique:users,correo',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed'
            ],
        ], [
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'usuario' => $request->usuario,
                'correo' => $request->correo,
                'password' => Hash::make($request->password)
            ]);

            // Autenticar al usuario recién registrado con el guard web
            Auth::guard('web')->login($user);
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'usuario' => $user->usuario,
                    'correo' => $user->correo,
                    'is_admin' => $user->is_admin,
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar el usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('usuario', 'password');
        $field = filter_var($credentials['usuario'], FILTER_VALIDATE_EMAIL) ? 'correo' : 'usuario';

        // Usa el guard web aquí
        if (Auth::guard('web')->attempt([$field => $credentials['usuario'], 'password' => $credentials['password']])) {
            $request->session()->regenerate();
            $user = Auth::guard('web')->user();

            return response()->json([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'usuario' => $user->usuario,
                    'correo' => $user->correo,
                    'is_admin' => $user->is_admin,
                ],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }
}