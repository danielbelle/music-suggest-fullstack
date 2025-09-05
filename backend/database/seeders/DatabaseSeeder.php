<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Desative temporariamente as factories comentando as linhas abaixo:
        // \App\Models\Musica::factory(5)->create();
        // \App\Models\Sugestao::factory(5)->create();

        // Use apenas o seeder de músicas
        $this->call([
            MusicaSeeder::class,
        ]);
    }
}
