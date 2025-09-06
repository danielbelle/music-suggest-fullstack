<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MusicaController;
use App\Http\Controllers\SugestaoController;

// Rotas públicas
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::get('/musicas', [MusicaController::class, 'index']);
Route::get('/musicas/{musica}', [MusicaController::class, 'show']);
Route::post('/sugestoes', [SugestaoController::class, 'store']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [LoginController::class, 'user']);
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::patch('/sugestoes/{sugestao}/aprovar', [SugestaoController::class, 'aprovar']);
    Route::patch('/sugestoes/{sugestao}/reprovar', [SugestaoController::class, 'reprovar']);
    Route::post('/musicas', [MusicaController::class, 'store']);
    Route::put('/musicas/{musica}', [MusicaController::class, 'update']);
    Route::delete('/musicas/{musica}', [MusicaController::class, 'destroy']);
    Route::patch('/musicas/{musica}/restore', [MusicaController::class, 'restore']);
    Route::delete('/sugestoes/{sugestao}', [SugestaoController::class, 'destroy']);
    Route::patch('/sugestoes/{id}/restore', [SugestaoController::class, 'restore']);
});
