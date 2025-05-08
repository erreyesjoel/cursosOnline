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
}


}
