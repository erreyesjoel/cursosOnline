<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'duracion',
        'imagen_url'
    ];
}
