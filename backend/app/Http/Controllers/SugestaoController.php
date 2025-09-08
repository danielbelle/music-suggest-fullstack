<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sugestao;
use App\Models\Musica;
use App\Rules\YouTubeUrl;
use App\Rules\YouTubeId;
use Laravel\Sanctum\PersonalAccessToken;

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
            'youtube_id' => ['required', 'string', new YouTubeId],
            'thumb' => 'required|string|max:255',
            'nome_usuario' => 'nullable|string|max:255',
            'email_usuario' => 'nullable|email|max:255',
        ]);

        //  VERIFICAÇÃO MANUAL do usuário autenticado via token Sanctum
        $user = null;
        if ($request->bearerToken()) {
            try {
                // Buscar o token no banco
                $token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->bearerToken());

                if ($token) {
                    // Buscar o usuário associado ao token
                    $user = $token->tokenable;

                    // Verificar se o usuário ainda existe e é válido
                    if (!$user instanceof \App\Models\User) {
                        $user = null;
                    }
                }
            } catch (\Exception $e) {
                // Token inválido ou erro, tratar como usuário não autenticado
                \Log::warning('Token inválido na sugestão: ' . $e->getMessage());
            }
        }

        // Se usuário está autenticado (via token), criar música diretamente
        if ($user) {
            // Criar a música diretamente
            $musicaData = [
                'titulo' => $validated['titulo'],
                'youtube_id' => $validated['youtube_id'],
                'thumb' => $validated['thumb'],
                'visualizacoes' => 0,
                'user_id' => $user->id,
            ];

            $musica = Musica::create($musicaData);

            // Criar sugestão com status aprovada
            $sugestaoData = array_merge($validated, [
                'status' => 'aprovada',
                'musica_id' => $musica->id,
                'user_id' => $user->id,
            ]);

            $sugestao = $user->sugestoes()->create($sugestaoData);

            return response()->json([
                'message' => 'Música adicionada com sucesso!',
                'musica' => $musica,
                'sugestao' => $sugestao
            ], 201);
        }

        // Usuário não autenticado - processo normal
        $sugestao = Sugestao::create($validated);

        return response()->json([
            'message' => 'Sugestão enviada com sucesso! Aguarde aprovação.',
            'sugestao' => $sugestao
        ], 201);
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

    // Aprovar sugestão (autenticado) - CORRIGIDO
    public function aprovar(Sugestao $sugestao)
    {
        // Criar uma nova música baseada na sugestão
        $musicaData = [
            'titulo' => $sugestao->titulo,
            'youtube_id' => $sugestao->youtube_id,
            'thumb' => $sugestao->thumb,
            'visualizacoes' => 0,
            'user_id' => $sugestao->user_id,
        ];

        // Criar a música
        $musica = Musica::create($musicaData);

        // Atualizar a sugestão com o ID da música criada e mudar status
        $sugestao->update([
            'status' => 'aprovada',
            'musica_id' => $musica->id,
        ]);

        return response()->json([
            'message' => 'Sugestão aprovada e música criada com sucesso.',
            'musica' => $musica
        ]);
    }

    // Reprovar sugestão (autenticado)
    public function reprovar(Sugestao $sugestao)
    {
        $sugestao->status = 'rejeitada';
        $sugestao->save();

        return response()->json(['message' => 'Sugestão rejeitada com sucesso.']);
    }

    // Listar sugestões pendentes (apenas para admin)
    public function pendentes()
    {
        $sugestoes = Sugestao::where('status', 'pendente')
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'email');
            }])
            ->orderByDesc('created_at')
            ->get();

        return response()->json($sugestoes);
    }
}
