<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Sugestao;
use App\Models\Musica;
use App\Models\User;

class SugestaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpar a tabela antes de popular
        Sugestao::truncate();

        // Obter alguns IDs de músicas e usuários existentes
        $musicaIds = Musica::pluck('id')->toArray();
        $userIds = User::pluck('id')->toArray();

        $sugestoes = [
            [
                'titulo' => 'Bohemian Rhapsody - Queen',
                'youtube_id' => 'fJ9rUzIMcZQ',
                'thumb' => 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
                'nome_usuario' => 'João Silva',
                'email_usuario' => 'joao@email.com',
                'status' => 'aprovada',
                'musica_id' => !empty($musicaIds) ? $musicaIds[array_rand($musicaIds)] : null,
                'user_id' => !empty($userIds) ? $userIds[array_rand($userIds)] : null,
            ],
            [
                'titulo' => 'Imagine - John Lennon',
                'youtube_id' => 'YkgkThdzX-8',
                'thumb' => 'https://i.ytimg.com/vi/YkgkThdzX-8/hqdefault.jpg',
                'nome_usuario' => 'Maria Santos',
                'email_usuario' => 'maria@email.com',
                'status' => 'pendente',
                'musica_id' => !empty($musicaIds) ? $musicaIds[array_rand($musicaIds)] : null,
                'user_id' => null, // Sugestão de usuário não logado
            ],
            [
                'titulo' => 'Hotel California - Eagles',
                'youtube_id' => 'BciS5krYL80',
                'thumb' => 'https://i.ytimg.com/vi/BciS5krYL80/hqdefault.jpg',
                'nome_usuario' => 'Pedro Oliveira',
                'email_usuario' => 'pedro@email.com',
                'status' => 'rejeitada',
                'musica_id' => !empty($musicaIds) ? $musicaIds[array_rand($musicaIds)] : null,
                'user_id' => !empty($userIds) ? $userIds[array_rand($userIds)] : null,
            ],
            [
                'titulo' => 'Sweet Child O\' Mine - Guns N\' Roses',
                'youtube_id' => '1w7OgIMMRc4',
                'thumb' => 'https://i.ytimg.com/vi/1w7OgIMMRc4/hqdefault.jpg',
                'nome_usuario' => 'Ana Costa',
                'email_usuario' => 'ana@email.com',
                'status' => 'aprovada',
                'musica_id' => null, // Sem música associada
                'user_id' => null,
            ],
            [
                'titulo' => 'Billie Jean - Michael Jackson',
                'youtube_id' => 'Zi_XLOBDo_Y',
                'thumb' => 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
                'nome_usuario' => 'Carlos Souza',
                'email_usuario' => 'carlos@email.com',
                'status' => 'pendente',
                'musica_id' => !empty($musicaIds) ? $musicaIds[array_rand($musicaIds)] : null,
                'user_id' => !empty($userIds) ? $userIds[array_rand($userIds)] : null,
            ],
        ];

        foreach ($sugestoes as $sugestao) {
            Sugestao::create($sugestao);
        }

        $this->command->info('Sugestões criadas com sucesso!');
    }
}
