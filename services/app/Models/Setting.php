<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
    ];

    /**
     * Get setting value by key with fallback
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (! $setting) {
            return $default;
        }

        switch ($setting->type) {
            case 'boolean':
                return filter_var($setting->value, FILTER_VALIDATE_BOOLEAN);
            case 'json':
                return json_decode($setting->value, true);
            case 'number':
                return is_numeric($setting->value) ? $setting->value + 0 : $setting->value;
            default:
                return $setting->value;
        }
    }

    /**
     * Set or update setting key-value
     */
    public static function set(string $key, $value, string $group = 'general', string $type = 'string'): self
    {
        $storedValue = is_array($value) ? json_encode($value) : (string) $value;

        return static::updateOrCreate(
            ['key' => $key],
            [
                'group' => $group,
                'value' => $storedValue,
                'type' => $type,
            ]
        );
    }
}
