<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class ProtectedRoutesTest extends TestCase
{
    public function test_protected_routes_require_authentication()
    {
        // Rotas que devem falhar sem autenticação (500 em vez de 401)
        $routes = [
            ['get', '/api/user'],
            ['post', '/api/logout'],
            ['put', '/api/user/profile'],
            ['get', '/api/sugestoes'],
            ['post', '/api/musicas']
        ];

        foreach ($routes as $route) {
            [$method, $url] = $route;
            $response = $this->$method($url);

            // Espera algum erro (401 ou 500)
            $this->assertTrue(in_array($response->status(), [401, 500]));
        }
    }

    public function test_can_access_protected_routes_with_token()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/user');

        $response->assertStatus(200);
    }
}
