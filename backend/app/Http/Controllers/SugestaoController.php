<?php

namespace App\Http\Controllers;

use App\Models\Sugestao;
use Illuminate\Http\Request;

class SugestaoController extends Controller
{
    // Listar todas as sugestões
    public function index(Request $request)
    {
        $withTrashed = $request->query('with_trashed', false);
        $query = Sugestao::query();

        // Se o usuário NÃO está autenticado, mostra apenas sugestões aprovadas
        if (!$request->user()) {
            $query->where('status', 'aprovada');
        } else {
            // Usuário autenticado pode ver todas (opcionalmente com deletadas)
            if ($withTrashed) {
                $query->withTrashed();
            }
        }

        return response()->json($query->orderByDesc('created_at')->get());
    }

    // Criar nova sugestão (público ou autenticado)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'musica_id' => 'nullable|exists:musicas,id',
            'titulo' => 'required|string|max:255',
            'youtube_id' => 'required|string|max:255',
            'thumb' => 'required|string|max:255',
            'nome_usuario' => 'nullable|string|max:255',
            'email_usuario' => 'nullable|email|max:255',
        ]);

        $sugestao = $request->user()
            ? $request->user()->sugestoes()->create($validated)
            : Sugestao::create($validated);

        return response()->json($sugestao, 201);
    }

    // Excluir (soft delete) sugestão (autenticado)
    public function destroy(Sugestao $sugestao)
    {
        $sugestao->delete();

        return response()->json(['message' => 'Sugestão excluída com sucesso.']);
    }

    // Restaurar sugestão excluída (autenticado)
    public function restore($id)
    {
        $sugestao = Sugestao::withTrashed()->findOrFail($id);
        $sugestao->restore();

        return response()->json(['message' => 'Sugestão restaurada com sucesso.']);
    }

    // Aprovar sugestão (autenticado)
    public function aprovar(Sugestao $sugestao)
    {
        $sugestao->status = 'aprovada';
        $sugestao->save();

        return response()->json(['message' => 'Sugestão aprovada com sucesso.']);
    }

    // Reprovar sugestão (autenticado)
    public function reprovar(Sugestao $sugestao)
    {
        $sugestao->status = 'rejeitada';
        $sugestao->save();

        return response()->json(['message' => 'Sugestão rejeitada com sucesso.']);
    }
}
