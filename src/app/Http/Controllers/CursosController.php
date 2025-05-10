<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursosController extends Controller
{   
    // metodo para coger los cursos, y todas sus columnas
    // en la principal, solo mostramos 4 cursos
    public function mostrarCursos()
    {
        return response()->json(Curso::take(4)->get());
    }
}
