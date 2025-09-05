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
        $patterns = [
            '/youtube\.com\/watch\?v=([^&]+)/',   // youtube.com/watch?v=ID
            '/youtu\.be\/([^?]+)/',               // youtu.be/ID
            '/youtube\.com\/embed\/([^?]+)/',     // youtube.com/embed/ID
        ];

        $matched = false;
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $matched = true;
                break;
            }
        }

        if (!$matched) {
            $fail('O formato do link é inválido. URL do YouTube.');
        }
    }
}
