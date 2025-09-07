<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SugestaoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sugestoes')->insert([
            [
                'musica_id' => 1,
                'titulo' => 'Mais sertanejo raiz',
                'youtube_id' => 's9kVG2ZaTS4',
                'thumb' => 'https://img.youtube.com/vi/s9kVG2ZaTS4/hqdefault.jpg',
                'nome_usuario' => 'João Silva',
                'email_usuario' => 'joao@example.com',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'musica_id' => 2,
                'titulo' => 'Playlist para viagem',
                'youtube_id' => 'lpGGNA6_920',
                'thumb' => 'https://img.youtube.com/vi/lpGGNA6_920/hqdefault.jpg',
                'nome_usuario' => 'Mariana Costa',
                'email_usuario' => 'mariana@example.com',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'musica_id' => 3,
                'titulo' => 'Clássicos esquecidos',
                'youtube_id' => 'FxXXvPL3JIg',
                'thumb' => 'https://img.youtube.com/vi/FxXXvPL3JIg/hqdefault.jpg',
                'nome_usuario' => 'Carlos Pereira',
                'email_usuario' => 'carlos@example.com',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'musica_id' => 4,
                'titulo' => 'Hits regionais',
                'youtube_id' => 'tRQ2PWlCcZk',
                'thumb' => 'https://img.youtube.com/vi/tRQ2PWlCcZk/hqdefault.jpg',
                'nome_usuario' => 'Ana Rodrigues',
                'email_usuario' => 'ana@example.com',
                'status' => 'rejected',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'musica_id' => 5,
                'titulo' => 'Seleção para relaxar',
                'youtube_id' => '4Nb89GFu2g4',
                'thumb' => 'https://img.youtube.com/vi/4Nb89GFu2g4/hqdefault.jpg',
                'nome_usuario' => 'Paulo Mendes',
                'email_usuario' => 'paulo@example.com',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
