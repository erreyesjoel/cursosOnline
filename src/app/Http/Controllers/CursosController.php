<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursosController extends Controller
{   
    // metodo para coger los cursos, y todas sus columnas
    public function mostrarCursos()
    {
        return response()->json(Curso::all());
    }
}
