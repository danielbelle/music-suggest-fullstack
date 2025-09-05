<?php

namespace App\Http\Controllers;

use App\Models\Musica;
use Illuminate\Http\Request;

class MusicaController extends Controller
{
    // Listar todas as músicas (inclusive opção para incluir/excluir deletadas)
    public function index(Request $request)
    {
        $withTrashed = $request->query('with_trashed', false);
        $query = Musica::query();

        if ($withTrashed) {
            $query->withTrashed();
        }

        return response()->json($query->orderByDesc('visualizacoes')->get());
    }

    // Adicionar nova música
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'visualizacoes' => 'required|integer|min:0',
            'youtube_id' => 'required|string|max:255',
            'thumb' => 'required|string|max:255',
        ]);

        $musica = $request->user()->musicas()->create($validated);

        return response()->json($musica, 201);
    }

    // Atualizar música existente
    public function update(Request $request, Musica $musica)
    {
        $validated = $request->validate([
            'titulo' => 'sometimes|string|max:255',
            'visualizacoes' => 'sometimes|integer|min:0',
            'youtube_id' => 'sometimes|string|max:255',
            'thumb' => 'sometimes|string|max:255',
        ]);

        $musica->update($validated);

        return response()->json($musica);
    }

    // Excluir (soft delete) música
    public function destroy(Musica $musica)
    {
        $musica->delete();

        return response()->json(['message' => 'Música excluída com sucesso.']);
    }

    // Restaurar música excluída
    public function restore($id)
    {
        $musica = Musica::withTrashed()->findOrFail($id);
        $musica->restore();

        return response()->json(['message' => 'Música restaurada com sucesso.']);
    }

    // Mostrar uma música específica
    public function show(Musica $musica)
    {
        return response()->json($musica);
    }
}
