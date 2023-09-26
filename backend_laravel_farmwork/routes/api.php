<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\OptionValueController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\AuthController;
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
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::delete('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
        
        
    });
});

Route::get('user/listAll', [UserController::class, 'index']);
Route::post('user/edit/{id}', [UserController::class, 'edit']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('categories',[CategoryController::class,'index']);
Route::post('categories',[CategoryController::class,'store']);
Route::get('categories/{id}',[CategoryController::class,'show']);
Route::get('categories/edit/{id}',[CategoryController::class,'edit']);
Route::put('categories/edit/{id}',[CategoryController::class,'update']);
Route::delete('categories/delete/{id}',[CategoryController::class,'destroy']);

Route::get('products',[ProductController::class,'index']);
Route::post('products',[ProductController::class,'store']);
Route::get('products/{id}',[ProductController::class,'show']);
Route::put('products/edit/{id}',[ProductController::class,'update']);
Route::delete('products/delete/{id}',[ProductController::class,'destroy']);

Route::get('options',[OptionController::class,'index']);
Route::post('options',[OptionController::class,'store']);
Route::get('options/{id}',[OptionController::class,'show']);
Route::put('options/edit/{id}',[OptionController::class,'update']);
Route::delete('options/delete/{id}',[OptionController::class,'destroy']);

Route::get('optionvalues',[OptionValueController::class,'index']);
Route::post('optionvalues',[OptionValueController::class,'store']);
Route::get('optionvalues/{id}',[OptionValueController::class,'show']);
Route::put('optionvalues/edit/{id}',[OptionValueController::class,'update']);
Route::delete('optionvalues/delete/{id}',[OptionValueController::class,'destroy']);