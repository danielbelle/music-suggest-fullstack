<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SugestaoController;
use App\Http\Controllers\MusicaController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/ping', function () {
    return response()->json(['message' => 'Backend conectado com sucesso!']);
});

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'ok', 'message' => 'Conexão com o banco bem-sucedida!']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});

// Rotas públicas
Route::get('/musicas', [MusicaController::class, 'index']);
Route::get('/musicas/{musica}', [MusicaController::class, 'show']);
Route::post('/sugestoes', [SugestaoController::class, 'store']);

// Rotas protegidas (ajuste o middleware conforme sua autenticação)
Route::middleware('auth')->group(function () {
    Route::patch('/sugestoes/{sugestao}/aprovar', [SugestaoController::class, 'aprovar']);
    Route::patch('/sugestoes/{sugestao}/reprovar', [SugestaoController::class, 'reprovar']);
    Route::post('/musicas', [MusicaController::class, 'store']);
    Route::put('/musicas/{musica}', [MusicaController::class, 'update']);
    Route::delete('/musicas/{musica}', [MusicaController::class, 'destroy']);
    Route::patch('/musicas/{musica}/restore', [MusicaController::class, 'restore']);
    Route::delete('/sugestoes/{sugestao}', [SugestaoController::class, 'destroy']);
    Route::patch('/sugestoes/{id}/restore', [SugestaoController::class, 'restore']);
});
