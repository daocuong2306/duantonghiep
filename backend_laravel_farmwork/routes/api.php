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
Route::get('category',[CategoryController::class,'index']);
Route::post('category',[CategoryController::class,'store']);
Route::get('category/{id}',[CategoryController::class,'show']);
Route::get('category/edit/{id}',[CategoryController::class,'edit']);
Route::put('category/edit/{id}',[CategoryController::class,'update']);
Route::delete('category/delete/{id}',[CategoryController::class,'destroy']);

Route::get('product',[ProductController::class,'index']);
Route::post('product',[ProductController::class,'store']);
Route::get('product/{id}',[ProductController::class,'show']);
Route::put('product/edit/{id}',[ProductController::class,'update']);
Route::delete('product/delete/{id}',[ProductController::class,'destroy']);