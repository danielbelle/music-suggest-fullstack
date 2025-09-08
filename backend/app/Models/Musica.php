<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Musica extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'titulo',
        'visualizacoes',
        'youtube_id',
        'thumb',
    ];

    public function sugestoes(): HasMany
    {
        return $this->hasMany(Sugestao::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
