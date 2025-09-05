<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SugestaoController;
use App\Http\Controllers\MusicaController;

// Rotas públicas (exemplo)
Route::get('/musicas', [MusicaController::class, 'index']);
Route::get('/sugestoes', [SugestaoController::class, 'index']);
Route::get('/musicas/{musica}', [MusicaController::class, 'show']);

// Rotas protegidas (apenas autenticado)
Route::middleware('auth:sanctum')->group(function () {
    // Aprovar/reprovar sugestões
    Route::patch('/sugestoes/{sugestao}/aprovar', [SugestaoController::class, 'aprovar']);
    Route::patch('/sugestoes/{sugestao}/reprovar', [SugestaoController::class, 'reprovar']);

    // CRUD de músicas (links)
    Route::post('/musicas', [MusicaController::class, 'store']);
    Route::put('/musicas/{musica}', [MusicaController::class, 'update']);
    Route::delete('/musicas/{musica}', [MusicaController::class, 'destroy']);
    Route::patch('/musicas/{musica}/restore', [MusicaController::class, 'restore']);
});
