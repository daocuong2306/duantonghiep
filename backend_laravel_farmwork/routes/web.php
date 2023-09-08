<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Category nè 
Route::get('/index',[App\Http\Controllers\CategoryController::class,'index'])->name('category_index');
Route::match(['GET','POST'],'/add',[App\Http\Controllers\CategoryController::class,'add'])->name('category_add');
Route::match(['GET','POST'],'/edit/{id}',[App\Http\Controllers\CategoryController::class,'edit'])->name('category_edit');
Route::get('/delete/{id}',[App\Http\Controllers\CategoryController::class,'delete'])->name('category_delete');