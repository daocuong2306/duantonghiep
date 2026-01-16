<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settingshop', function (Blueprint $table) {
            $table->id();
            $table->string('logo');
            $table->string('nameshop')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('emailshop')->nullable();
            $table->integer('phone')->nullable();
            $table->string('website_link')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settingshop');
    }
};
