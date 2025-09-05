<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MusicaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'visualizacoes' => $this->faker->numberBetween(1000, 10000000),
            'youtube_id' => $this->faker->regexify('[A-Za-z0-9_-]{11}'),
            'thumb' => 'https://img.youtube.com/vi/' . $this->faker->regexify('[A-Za-z0-9_-]{11}') . '/hqdefault.jpg',
        ];
    }
}
