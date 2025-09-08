<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Musica;
use App\Models\Sugestao;

class PublicRoutesTest extends TestCase
{

    protected function setUp(): void
    {
        parent::setUp();

        // Limpa os dados antes de cada teste
        Sugestao::query()->delete();
        Musica::query()->delete();
        User::where('email', 'like', '%@example.com')->delete();
    }

    public function test_can_list_musicas()
    {
        $response = $this->getJson('/api/musicas');
        $response->assertStatus(200);
    }

    public function test_can_create_sugestao()
    {
        $data = [
            'titulo' => 'Sugestão Teste',
            'artista' => 'Artista Teste',
            'youtube_id' => 'dQw4w9WgXcQ', // ← Campo CORRETO (não youtube_url)
            'thumb' => 'https://example.com/thumb.jpg' // ← Campo OBRIGATÓRIO
        ];

        $response = $this->postJson('/api/sugestoes', $data);
        $response->assertStatus(201);
    }

    public function test_can_register_user()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test' . uniqid() . '@example.com', // ← Email único
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ];

        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(201);
    }

    public function test_can_create_sugestao_autenticado()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $data = [
            'titulo' => 'Sugestão Teste',
            'artista' => 'Artista Teste',
            'youtube_id' => 'dQw4w9WgXcQ',
            'thumb' => 'https://example.com/thumb.jpg'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/sugestoes', $data);

        $response->assertStatus(201);

        // Verifica se criou tanto a sugestão quanto a música
        $this->assertDatabaseHas('sugestoes', ['titulo' => 'Sugestão Teste']);
        $this->assertDatabaseHas('musicas', ['titulo' => 'Sugestão Teste']);
    }

    public function test_can_create_sugestao_nao_autenticado()
    {
        $data = [
            'titulo' => 'Sugestão Teste ' . uniqid(), // ← Título único
            'youtube_id' => 'dQw4w9WgXcQ',
            'thumb' => 'https://example.com/thumb.jpg',
            'nome_usuario' => 'Usuário Anônimo',
            'email_usuario' => 'anonimo@example.com'
        ];

        $response = $this->postJson('/api/sugestoes', $data);
        $response->assertStatus(201);

        // Verifica se criou apenas a sugestão (não a música)
        $this->assertDatabaseHas('sugestoes', ['titulo' => $data['titulo']]);
        $this->assertDatabaseMissing('musicas', ['titulo' => $data['titulo']]);
    }
}
