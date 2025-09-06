<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

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
