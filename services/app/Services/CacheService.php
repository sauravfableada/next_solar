<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    /**
     * Compute randomized TTL with jitter between min and max minutes.
     * Prevents cache stampede / simultaneous expiration spikes.
     */
    public static function randomTtl(int $baseMinutes = 30, int $jitterPercentage = 25): int
    {
        $jitter = (int) ($baseMinutes * ($jitterPercentage / 100));
        $min = max(1, $baseMinutes - $jitter);
        $max = $baseMinutes + $jitter;

        // Return TTL in seconds with random jitter
        return rand($min * 60, $max * 60);
    }

    /**
     * Remember item in Cache with randomized TTL.
     */
    public static function rememberWithJitter(string $key, int $baseMinutes, callable $callback, int $jitterPercentage = 25)
    {
        $ttlSeconds = self::randomTtl($baseMinutes, $jitterPercentage);

        return Cache::remember($key, $ttlSeconds, $callback);
    }

    /**
     * Safely forget single or multiple cache keys.
     */
    public static function forgetKeys(array|string $keys): void
    {
        foreach ((array) $keys as $key) {
            Cache::forget($key);
        }
    }
}

