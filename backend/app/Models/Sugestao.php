<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sugestao extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'musica_id',
        'titulo',
        'youtube_id',
        'thumb',
        'nome_usuario',
        'email_usuario',
        'status',
    ];

    public function musica(): BelongsTo
    {
        return $this->belongsTo(Musica::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
