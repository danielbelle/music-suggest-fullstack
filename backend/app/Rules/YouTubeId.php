<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class YouTubeId implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || $value === '') {
            $fail('O ID do YouTube é inválido.');
            return;
        }

        // Valida se é um ID válido do YouTube (11 caracteres alfanuméricos)
        if (!preg_match('/^[a-zA-Z0-9_-]{11}$/', $value)) {
            $fail('O ID do YouTube é inválido.');
        }
    }
}
