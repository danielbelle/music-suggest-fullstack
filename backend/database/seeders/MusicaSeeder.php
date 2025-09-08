<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusicaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('musicas')->insert([
            [
                'titulo' => 'O Mineiro e o Italiano',
                'visualizacoes' => 5200000,
                'youtube_id' => 's9kVG2ZaTS4',
                'thumb' => 'https://img.youtube.com/vi/s9kVG2ZaTS4/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Pagode em Brasília',
                'visualizacoes' => 5000000,
                'youtube_id' => 'lpGGNA6_920',
                'thumb' => 'https://img.youtube.com/vi/lpGGNA6_920/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Rio de Lágrimas',
                'visualizacoes' => 153000,
                'youtube_id' => 'FxXXvPL3JIg',
                'thumb' => 'https://img.youtube.com/vi/FxXXvPL3JIg/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Tristeza do Jeca',
                'visualizacoes' => 154000,
                'youtube_id' => 'tRQ2PWlCcZk',
                'thumb' => 'https://img.youtube.com/vi/tRQ2PWlCcZk/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Terra roxa',
                'visualizacoes' => 3300000,
                'youtube_id' => '4Nb89GFu2g4',
                'thumb' => 'https://img.youtube.com/vi/4Nb89GFu2g4/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Samba da Praça',
                'visualizacoes' => 1200000,
                'youtube_id' => 'A1b2C3d4E5F',
                'thumb' => 'https://img.youtube.com/vi/A1b2C3d4E5F/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Choro da Lua',
                'visualizacoes' => 870000,
                'youtube_id' => 'B2c3D4e5F6g',
                'thumb' => 'https://img.youtube.com/vi/B2c3D4e5F6g/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Cantiga do Violeiro',
                'visualizacoes' => 450000,
                'youtube_id' => 'C3d4E5f6G7h',
                'thumb' => 'https://img.youtube.com/vi/C3d4E5f6G7h/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Noite de Seresta',
                'visualizacoes' => 230000,
                'youtube_id' => 'D4e5F6g7H8i',
                'thumb' => 'https://img.youtube.com/vi/D4e5F6g7H8i/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Moda da Saudade',
                'visualizacoes' => 980000,
                'youtube_id' => 'E5f6G7h8I9j',
                'thumb' => 'https://img.youtube.com/vi/E5f6G7h8I9j/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Coração Sertanejo',
                'visualizacoes' => 4100000,
                'youtube_id' => 'F6g7H8i9J0k',
                'thumb' => 'https://img.youtube.com/vi/F6g7H8i9J0k/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Baião do Sertão',
                'visualizacoes' => 760000,
                'youtube_id' => 'G7h8I9j0K1l',
                'thumb' => 'https://img.youtube.com/vi/G7h8I9j0K1l/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Xote da Amizade',
                'visualizacoes' => 150000,
                'youtube_id' => 'H8i9J0k1L2m',
                'thumb' => 'https://img.youtube.com/vi/H8i9J0k1L2m/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Ritmo do Interior',
                'visualizacoes' => 640000,
                'youtube_id' => 'I9j0K1l2M3n',
                'thumb' => 'https://img.youtube.com/vi/I9j0K1l2M3n/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Valsa do Vale',
                'visualizacoes' => 270000,
                'youtube_id' => 'J0k1L2m3N4o',
                'thumb' => 'https://img.youtube.com/vi/J0k1L2m3N4o/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Lamento do Pescador',
                'visualizacoes' => 310000,
                'youtube_id' => 'K1l2M3n4O5p',
                'thumb' => 'https://img.youtube.com/vi/K1l2M3n4O5p/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Melodia do Café',
                'visualizacoes' => 930000,
                'youtube_id' => 'L2m3N4o5P6q',
                'thumb' => 'https://img.youtube.com/vi/L2m3N4o5P6q/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Serenata do Amor',
                'visualizacoes' => 210000,
                'youtube_id' => 'M3n4O5p6Q7r',
                'thumb' => 'https://img.youtube.com/vi/M3n4O5p6Q7r/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Fandango da Mata',
                'visualizacoes' => 520000,
                'youtube_id' => 'N4o5P6q7R8s',
                'thumb' => 'https://img.youtube.com/vi/N4o5P6q7R8s/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Toada da Cachoeira',
                'visualizacoes' => 125000,
                'youtube_id' => 'O5p6Q7r8S9t',
                'thumb' => 'https://img.youtube.com/vi/O5p6Q7r8S9t/hqdefault.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
