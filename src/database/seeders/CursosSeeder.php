<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Curso;

class CursosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run(): void
{
    Curso::create([
        'titulo' => 'curso 1',
        'descripcion' => 'este es el curso 1',
        'duracion' => '02:30:00',
    ]);

    Curso::create([
        'titulo' => 'curso 2',
        'descripcion' => 'este es el curso 2',
        'duracion' => '05:00:00',
        'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fanta_logo_%282009%29.svg/1200px-Fanta_logo_%282009%29.svg.png'
    ]);

    Curso::create([
        'titulo' => 'curso 3',
        'descripcion' => 'este es el curso 3',
        'duracion' => '01:15:00',
    ]);

    Curso::create([
        'titulo' => 'curso 4',
        'descripcion' => 'este es el curso 4',
        'duracion' => '03:45:00',
    ]);

    Curso::create([
        'titulo' => 'curso 5',
        'descripcion' => 'este es el curso 5',
        'duracion' => '04:10:00',
    ]);
}

}
