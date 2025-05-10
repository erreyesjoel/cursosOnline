<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;

class CursosSeeder extends Seeder
{
    public function run(): void
    {
        Curso::create([
            'titulo' => 'Introducción a HTML',
            'descripcion' => 'Aprende la estructura básica de las páginas web con HTML.',
            'duracion' => '02:30:00',
            'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
        ]);

        Curso::create([
            'titulo' => 'CSS desde cero',
            'descripcion' => 'Domina los estilos y el diseño visual de sitios web.',
            'duracion' => '05:00:00',
            'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
        ]);

        Curso::create([
            'titulo' => 'JavaScript básico',
            'descripcion' => 'Descubre cómo hacer tus páginas interactivas usando JavaScript.',
            'duracion' => '01:15:00',
            'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
        ]);

        Curso::create([
            'titulo' => 'PHP para principiantes',
            'descripcion' => 'Empieza a trabajar con lógica de servidor usando PHP.',
            'duracion' => '03:45:00',
            'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'
        ]);

        Curso::create([
            'titulo' => 'Proyecto final: Sitio web completo',
            'descripcion' => 'Aplica lo aprendido creando un sitio con HTML, CSS, JS y PHP.',
            'duracion' => '04:10:00',
            'imagen_url' => 'https://upload.wikimedia.org/wikipedia/commons/3/31/Website_Creation_-_2021.svg'
        ]);
    }
}
