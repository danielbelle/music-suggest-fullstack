<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class YouTubeUrl implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || $value === '') {
            $fail('O formato do link é inválido. URL do YouTube.');
            return;
        }

        $patterns = [
            '/youtube\.com\/watch\?v=([^&]+)/i',   // youtube.com/watch?v=ID (pára no &)
            '/youtu\.be\/([^?&]+)/i',              // youtu.be/ID
            '/youtube\.com\/embed\/([^?&]+)/i',    // youtube.com/embed/ID
        ];

        $videoId = null;
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $value, $matches)) {
                $videoId = $matches[1] ?? null;
                break;
            }
        }

        if (!$videoId) {
            $fail('O formato do link é inválido. URL do YouTube.');
            return;
        }

        // Reconstrói a URL sem parâmetros indesejados (como &t=...)
        $cleaned = "https://www.youtube.com/watch?v={$videoId}";

        // Se estivermos validando uma Request, sobrescreve o valor limpo
        if (function_exists('request')) {
            try {
                request()->merge([$attribute => $cleaned]);
            } catch (\Throwable $e) {
                // silenciosamente ignora se não for possível sobrescrever a request
            }
        }
    }
}
