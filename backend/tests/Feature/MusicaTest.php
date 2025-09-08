<?php

namespace Tests\Feature;

use App\Models\Musica;
use App\Models\User;
use Tests\TestCase;

class MusicaTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Limpa as músicas antes de cada teste
        Musica::query()->delete();
    }

    public function test_can_list_musicas()
    {
        Musica::factory()->count(3)->create();

        // Rota é pública, não precisa de autenticação
        $response = $this->getJson('/api/musicas');

        $response->assertStatus(200);
        $this->assertCount(3, $response->json()); // Agora deve funcionar
    }

    public function test_can_create_musica()
    {
        $user = User::factory()->create();

        $data = [
            'titulo' => 'Test Music',

            'youtube_id' => 'dQw4w9WgXcQ',
            'visualizacoes' => 1000,
            'thumb' => 'https://example.com/thumb.jpg'
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/musicas', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('musicas', [
            'titulo' => 'Test Music',
            'youtube_id' => 'dQw4w9WgXcQ',
            'user_id' => $user->id // Verifica também o user_id
        ]);
    }
}
