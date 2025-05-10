<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CursosController extends Controller
{   
    // metodo para coger los cursos, y todas sus columnas
    // en la principal, solo mostramos 4 cursos
    public function mostrarCursos()
    {
        return response()->json(Curso::take(4)->get());
    }

     // Métodos protegidos para administradores
    
    /**
     * Obtener todos los cursos (para admin)
     */
    public function index()
    {
        return response()->json(Curso::all());
    }
    /**
     * Crear un nuevo curso
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'duracion' => 'required|string',
            'imagen_url' => 'nullable|url'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $curso = Curso::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $curso
        ], 201);
    }
    /**
     * Eliminar un curso
     */
    public function destroy(Curso $curso)
    {
        $curso->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Curso eliminado correctamente'
        ], 204);
    }
}
