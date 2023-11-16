<?php

use App\Models\CartProduct;
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
        Schema::create('cartproducts', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('cart_id');
            $table->integer('product_id');
            $table->integer('sku_id');
            $table->integer('quantity');
            $table->integer('price_cartpro')->nullable();
            $table->string('status')->default(CartProduct::NO_ORDER);
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
        Schema::dropIfExists('cartproducts');
    }
};