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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->json('product_ids')->nullable();
            // $table->integer('product_id');
            // $table->integer('sku_id');
            // $table->integer('quantity');
            // $table->integer('price_cart')->nullable();
            // $table->string('status')->default(\App\Models\Cart::NO_ORDER);
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
        Schema::dropIfExists('carts');
    }
};
