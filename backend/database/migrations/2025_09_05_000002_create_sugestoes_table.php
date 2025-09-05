<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sugestoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('musica_id')->nullable()->constrained('musicas')->nullOnDelete();
            $table->string('titulo');
            $table->string('youtube_id');
            $table->string('thumb');
            $table->string('nome_usuario')->nullable();
            $table->string('email_usuario')->nullable();
            $table->enum('status', ['pendente', 'aprovada', 'rejeitada'])->default('pendente');
            $table->timestamps();
            $table->softDeletes(); // Soft delete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sugestoes');
    }
};
