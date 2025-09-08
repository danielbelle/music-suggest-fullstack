<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Musica;
use Tests\TestCase;

class MusicaControllerTest extends TestCase
{
    public function test_can_create_musica()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $data = [
            'titulo' => 'Nova Música',
            'visualizacoes' => 1000,
            'youtube_id' => 'dQw4w9WgXcQ',
            'thumb' => 'https://example.com/thumb.jpg'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/musicas', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('musicas', ['titulo' => 'Nova Música']);
    }

    public function test_can_update_musica()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;
        $musica = Musica::factory()->create(['user_id' => $user->id]);

        $data = ['titulo' => 'Título Atualizado'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->putJson("/api/musicas/{$musica->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('musicas', ['titulo' => 'Título Atualizado']);
    }
}
