<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('categorys',[CategoryController::class,'index']);
Route::post('categorys',[CategoryController::class,'store']);
Route::get('categorys/{id}',[CategoryController::class,'show']);
Route::get('categorys/edit/{id}',[CategoryController::class,'edit']);
Route::put('categorys/edit/{id}',[CategoryController::class,'update']);
Route::delete('categorys/delete/{id}',[CategoryController::class,'destroy']);

Route::get('products',[ProductController::class,'index']);
Route::post('products',[ProductController::class,'store']);
Route::get('products/{id}',[ProductController::class,'show']);
Route::put('products/edit/{id}',[ProductController::class,'update']);
Route::delete('products/delete/{id}',[ProductController::class,'destroy']);