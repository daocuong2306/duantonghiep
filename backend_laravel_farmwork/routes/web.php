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
    return view('template/admin');
});

//Category nè 
Route::get('/category',[App\Http\Controllers\CategoryController::class,'index'])->name('category_index');
Route::match(['GET','POST'],'/add_category',[App\Http\Controllers\CategoryController::class,'add'])->name('category_add');
Route::match(['GET','POST'],'/edit_category/{id}',[App\Http\Controllers\CategoryController::class,'edit'])->name('category_edit');
Route::get('/delete_category/{id}',[App\Http\Controllers\CategoryController::class,'delete'])->name('category_delete');
//the  router product
Route::get('/productlist',[App\Http\Controllers\ProductController::class,'index'])->name('product_index');
Route::match(['GET','POST'],'/add_product',[App\Http\Controllers\ProductController::class,'addproducts'])->name('product_add');
Route::match(['GET','POST'],'/edit_product/{id}',[App\Http\Controllers\ProductController::class,'editproduct'])->name('product_edit');
Route::get('/delete_product/{id}',[App\Http\Controllers\ProductController::class,'deleteproduct'])->name('product_delete');
