<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('musicas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->unsignedBigInteger('visualizacoes')->default(0);
            $table->string('youtube_id');
            $table->string('thumb');
            $table->timestamps();
            $table->softDeletes(); // Soft delete
        });

        Schema::table('musicas', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('musicas', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::dropIfExists('musicas');
    }
};
