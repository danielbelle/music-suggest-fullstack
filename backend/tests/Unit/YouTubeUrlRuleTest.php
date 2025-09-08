<?php

namespace Tests\Unit;

use App\Rules\YouTubeUrl;
use Tests\TestCase;

class YouTubeUrlRuleTest extends TestCase
{
    public function test_valid_youtube_url_passes()
    {
        $rule = new YouTubeUrl();
        $passed = true;

        $rule->validate(
            'url',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            function ($error) use (&$passed) {
                $passed = false;
            }
        );

        $this->assertTrue($passed);
    }

    public function test_invalid_youtube_url_fails()
    {
        $rule = new YouTubeUrl();
        $passed = true;

        $rule->validate(
            'url',
            'https://invalid.com',
            function ($error) use (&$passed) {
                $passed = false;
            }
        );

        $this->assertFalse($passed);
    }
}
