<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\OptionValueController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\EvaluateController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\Variant\VariantController;

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
//Check Role...... chỉ có ADMIN ........(Chức năng nào của Admin thì cho vào function của group route này nhé !)
Route::group(['middleware' => ['auth:api', 'role']], function () {
    Route::get('/who', function () { //
        return response()->json([
            'message' => 'You are Admin.'
        ]);
    });
    Route::get('user/show_one/{id}', [UserController::class, 'show']);
    Route::delete('auth/logout', [AuthController::class, 'logout']);
    Route::get('user/listAll', [UserController::class, 'index']);
    Route::get('user/banUser/{id}', [UserController::class, 'banUser']);
    Route::get('user/unBanUser/{id}', [UserController::class, 'unBanUser']);
    //Comment.................
    Route::get('admin/comment/listAll', [CommentController::class, 'listcomment']);
    Route::get('admin/comment/findbyuser/{id}', [CommentController::class, 'findCommentbyUser']);
    Route::get('admin/comment/findbyproduct/{id}', [CommentController::class, 'findCommentbyProduct']);
    Route::delete('comment/deletebyadmin/{id}', [CommentController::class, 'deleteByAmin']);
    //Evaluate
    Route::get('admin/evaluate/listAll', [EvaluateController::class, 'showAll']);
    Route::delete('admin/evaluate/delete/{id}', [EvaluateController::class, 'delete']);
    //Image
    Route::post('admin/image/addimageproduct', [ImageController::class, 'addImageProduct']);
    //Setting
    Route::post('admin/settingshop', [SettingController::class, 'setingshope']);
    Route::get('admin/editinforshop', [SettingController::class, 'InforShop']);
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
    //Evaluate
    Route::post('evaluate/add', [EvaluateController::class, 'addEvaluate']);
    Route::get('evaluate/list', [EvaluateController::class, 'showEvaoluateWithUser']);
    Route::get('evaluate/listbyuser', [EvaluateController::class, 'getEvalueByUser']);
    //Images
    Route::post('image/addimagecomment', [ImageController::class, 'addImageComment']);
});
// Sanctum---------------------------------------------------
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Categories
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories/add', [CategoryController::class, 'store']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::post('categories/edit/{id}', [CategoryController::class, 'update']);
Route::delete('categories/delete/{id}', [CategoryController::class, 'destroy']);
//Products
Route::get('products', [ProductController::class, 'index']);
Route::post('products/add', [ProductController::class, 'store']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::post('products/edit/{id}', [ProductController::class, 'update']);
Route::delete('products/delete/{id}', [ProductController::class, 'destroy']);
// Route::post('products/findByCategory', [ProductController::class, 'findByCategory']);
// Route::post('products/findByKeyword', [ProductController::class, 'findByKeyword']);
//Options
Route::get('options', [OptionController::class, 'index']);
Route::post('options/add', [OptionController::class, 'store']);
Route::get('options/{id}', [OptionController::class, 'show']);
Route::post('options/edit/{id}', [OptionController::class, 'update']);
Route::delete('options/delete/{id}', [OptionController::class, 'destroy']);
//Option Value
Route::get('optionvalues/{id}', [OptionValueController::class, 'index']);
Route::post('optionvalues/add', [OptionValueController::class, 'store']);
Route::get('optionvalues/show/{id}', [OptionValueController::class, 'show']);
Route::post('optionvalues/edit/{id}', [OptionValueController::class, 'update']);
Route::delete('optionvalues/delete/{id}', [OptionValueController::class, 'destroy']);
// Route::get('optionvalues/properties', [OptionValueController::class, 'properties']);
// Route::post('optionvalues/khanh', [OptionValueController::class, 'store']);
//Variant
Route::get('variants', [VariantController::class, 'index']);
Route::post('variants/getvalue', [VariantController::class, 'getOptionValue']);
Route::post('variants/addvariant', [VariantController::class, 'addVariant']);
Route::get('variants/listvariant/{id}', [VariantController::class, 'listVariant']);

//Banner
Route::get('banner/listnew', [BannerController::class, 'getNewBanner']);
Route::post('banner/add', [BannerController::class, 'addBanner']);
Route::delete('banner/delete/{id}', [BannerController::class, 'deleteBanner']);
// Home
Route::get('home', [HomeController::class, 'home']);

// Check nếu chưa đăng nhập sẽ nhảy vào route này
Route::get('/check', function () {
    return response()->json([
        'message' => 'Bạn Phải Đăng nhập'
    ]);
})->name('check');
