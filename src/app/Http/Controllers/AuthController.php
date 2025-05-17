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
            'min:8',  // Solo longitud mínima de 8
            'confirmed'
        ],
    ], [
        'password.confirmed' => 'Las contraseñas no coinciden.',
        'password.min' => 'La contraseña debe tener al menos 8 caracteres.'
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
            'user' => $user->only(['id', 'nombre', 'apellido', 'usuario', 'correo', 'is_admin']),
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
    public function login(Request $request)
{
    // Validación de los datos del formulario
    $validator = Validator::make($request->all(), [
        'usuario' => 'required|string', // Puede ser username o email, mejor asi a mi parecer...
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Intentar autenticar por usuario o correo
    $credentials = $request->only('usuario', 'password');
    $field = filter_var($credentials['usuario'], FILTER_VALIDATE_EMAIL) ? 'correo' : 'usuario';
    
    // Buscar al usuario
    $user = User::where($field, $credentials['usuario'])->first();

    // Verificar credenciales
    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    // Generar token de acceso
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
    'success' => true,
    'message' => 'Inicio de sesión exitoso',
    'user' => $user->only(['id', 'nombre', 'apellido', 'usuario', 'correo', 'is_admin']),
    'token_type' => 'Bearer'
])->cookie(
    'auth_token', // nombre de la cookie
    $token,       // valor del token
    60 * 24,      // duración en minutos (1 día)
    null,
    null,
    true,         // secure (solo HTTPS en producción)
    true,         // httpOnly
    false,        // raw
    'Strict'      // SameSite
);
}
public function logout(Request $request)
{
    try {
        // Revocar el token actual del usuario
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error al cerrar sesión',
            'error' => $e->getMessage()
        ], 500);
    }
}
}