<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MusicaController;
use App\Http\Controllers\SugestaoController;

// rotas públicas
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);

// rotas públicas de música/sugestão (exemplos)
Route::get('/musicas', [MusicaController::class, 'index']);
Route::post('/sugestoes', [SugestaoController::class, 'store']);

// rota protegida que usa cookie/session (Sanctum SPA)
Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/sugestoes/{sugestao}/aprovar', [SugestaoController::class, 'aprovar']);
    Route::patch('/sugestoes/{sugestao}/reprovar', [SugestaoController::class, 'reprovar']);
    Route::post('/musicas', [MusicaController::class, 'store']);
    Route::put('/musicas/{musica}', [MusicaController::class, 'update']);
    Route::delete('/musicas/{musica}', [MusicaController::class, 'destroy']);
    Route::patch('/musicas/{musica}/restore', [MusicaController::class, 'restore']);
    Route::delete('/sugestoes/{sugestao}', [SugestaoController::class, 'destroy']);
    Route::patch('/sugestoes/{id}/restore', [SugestaoController::class, 'restore']);
});
