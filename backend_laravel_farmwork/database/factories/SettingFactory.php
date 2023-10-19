<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'logo' => 'acb.jbg',
            'nameshop' => 'npm.jpg',
            'address' => "PK",
            'city' => "Hà NỤi",
            'emailshop' => 'tienrider30@gmail.com', 
            'phone' => '0898737406',
            'website_link' => '18+.com',
            'facebook_link' => 'page 18+',
            'twitter_link' => '18+',
            'instagram_link' => '18+',
        ];
    }
}
