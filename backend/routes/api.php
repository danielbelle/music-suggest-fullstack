<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MusicaController;
use App\Http\Controllers\SugestaoController;
use App\Http\Controllers\UserController;

// rotas públicas
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);


// rotas públicas de música/sugestão (exemplos)
Route::get('/musicas', [MusicaController::class, 'index']);
Route::post('/sugestoes', [SugestaoController::class, 'store']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [LoginController::class, 'user']);
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::prefix('user')->group(function () {
        Route::put('/profile', [UserController::class, 'updateProfile']);
        Route::put('/password', [UserController::class, 'changePassword']);
    });

    Route::prefix('sugestoes')->name('sugestoes.')->group(function () {
        Route::get('/', [SugestaoController::class, 'index']);
        Route::get('/pendentes', [SugestaoController::class, 'pendentes']);
        Route::patch('/{sugestao}/aprovar', [SugestaoController::class, 'aprovar']);
        Route::patch('/{sugestao}/reprovar', [SugestaoController::class, 'reprovar']);
        Route::delete('/{sugestao}', [SugestaoController::class, 'destroy']);
        Route::patch('/{id}/restore', [SugestaoController::class, 'restore']);
    });
    Route::prefix('musicas')->name('musicas.')->group(function () {
        Route::post('/', [MusicaController::class, 'store']);
        Route::put('/{musica}', [MusicaController::class, 'update']);
        Route::delete('/{musica}', [MusicaController::class, 'destroy']);
        Route::patch('/{musica}/restore', [MusicaController::class, 'restore']);
    });
});
