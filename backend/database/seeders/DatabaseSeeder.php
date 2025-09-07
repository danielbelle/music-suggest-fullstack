<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Use apenas o seeder de músicas
        $this->call([
            MusicaSeeder::class,
        ]);

        // Cria um usuário Root para testes
        User::create([
            'name' => 'Root',
            'email' => 'root@root.com',
            'password' => Hash::make('root1234'), // senha: root1234
        ]);

        // Use o seeder de sugestões
        $this->call([
            SugestaoSeeder::class,
        ]);
    }
}
