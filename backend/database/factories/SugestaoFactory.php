<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SugestaoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'musica_id' => null, // ou use Musica::factory() se quiser associar
            'titulo' => $this->faker->sentence(3),
            'youtube_id' => $this->faker->regexify('[A-Za-z0-9_-]{11}'),
            'thumb' => 'https://img.youtube.com/vi/' . $this->faker->regexify('[A-Za-z0-9_-]{11}') . '/hqdefault.jpg',
            'nome_usuario' => $this->faker->name(),
            'email_usuario' => $this->faker->safeEmail(),
            'status' => $this->faker->randomElement(['pendente', 'aprovada', 'rejeitada']),
        ];
    }
}
