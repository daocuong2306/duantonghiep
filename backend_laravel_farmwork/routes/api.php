<?php

use App\Http\Controllers\Api\CategoryController;
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
Route::get('category/{id}/edit',[CategoryController::class,'edit']);
Route::put('category/{id}/edit',[CategoryController::class,'update']);
Route::delete('category/{id}/delete',[CategoryController::class,'destroy']);
