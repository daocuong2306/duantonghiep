<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\OptionValueController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
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


// Login = Passport .........................................................
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register']);
});
//Check Role...... chỉ có admin ........(Chức năng nào của Admin thì cho vào function của group route này nhé !)
Route::group(['middleware' => ['auth:api', 'role']], function () {

    Route::get('/who', function () { //
        return response()->json([
            'message' => 'You are Admin.'
        ]);
    });
    
    Route::get('user/show_one/{id}', [UserController::class, 'show']);
    Route::delete('auth/logout', [AuthController::class, 'logout']);
    
    Route::get('user/listAll', [UserController::class, 'index']);
    
    //Comment.................
    Route::get('comment/listAll', [CommentController::class, 'listcomment']);
    Route::get('comment/findbyuser/{id}', [CommentController::class, 'findCommentbyUser']);
    Route::get('comment/findbyproduct/{id}', [CommentController::class, 'findCommentbyProduct']);
    Route::delete('comment/deletebyadmin/{id}', [CommentController::class, 'deleteByAmin']);
});
// ................ Cả Amin và User đều sử dụng => không check role chỉ check auth  ..............................
Route::group(['middleware' => 'auth:api'], function () {
    //User
    Route::get('auth/user', [AuthController::class, 'user']);
    Route::post('user/edit/{id}', [UserController::class, 'edit']);
    Route::get('user/show_one/{id}', [UserController::class, 'show']);
    //Comment
    Route::post('comment/add', [CommentController::class, 'addcomment']);
    Route::delete('comment/deletebyuser/{id}', [CommentController::class, 'deleteByUser']);
});

// Sanctum---------------------------------------------------
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    
});
Route::get('/check', function () { //
    return response()->json([
        'message' => 'Bạn Phải Đăng nhập'
    ]);
})->name('check');
// Categories
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories/add', [CategoryController::class, 'store']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::put('categories/edit/{id}', [CategoryController::class, 'update']);
Route::delete('categories/delete/{id}', [CategoryController::class, 'destroy']);
//Products
Route::get('products', [ProductController::class, 'index']);
Route::post('products', [ProductController::class, 'store']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::put('products/edit/{id}', [ProductController::class, 'update']);
Route::delete('products/delete/{id}', [ProductController::class, 'destroy']);
//Options
Route::get('options', [OptionController::class, 'index']);
Route::post('options', [OptionController::class, 'store']);
Route::get('options/{id}', [OptionController::class, 'show']);
Route::put('options/edit/{id}', [OptionController::class, 'update']);
Route::delete('options/delete/{id}', [OptionController::class, 'destroy']);
//Option Value
Route::get('optionvalues', [OptionValueController::class, 'index']);
Route::post('optionvalues', [OptionValueController::class, 'store']);
Route::get('optionvalues/{id}', [OptionValueController::class, 'show']);
Route::put('optionvalues/edit/{id}', [OptionValueController::class, 'update']);
Route::delete('optionvalues/delete/{id}', [OptionValueController::class, 'destroy']);
//Banner
Route::get('banner/listnew', [BannerController::class, 'getNewBanner']);
Route::post('banner/add', [BannerController::class, 'addBanner']);
Route::delete('banner/delete/{id}', [BannerController::class, 'deleteBanner']);


