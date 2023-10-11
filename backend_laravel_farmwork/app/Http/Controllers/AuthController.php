<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();

            if ($errors->has('name')) {
                $nameError = $errors->first('name');
                return response()->json([
                    'errors' => $nameError,
                    'errors_code' => 1
                ]);
            }
            $emailError = $errors->get('email');
            if ($errors->has('email')) {
                
                return response()->json([
                    'errors' => $emailError,
                    'errors_code' => 2
                ]);
            }
            if (in_array('The email has already been taken.', $emailError)) {
                return response()->json([
                    'errors' => $emailError,
                    'errors_code' => 3
                ]);
            }
            if ($errors->has('password')) {
                $passwordError = $errors->first('password');
                return response()->json([
                    'errors' => $passwordError,
                    'errors_code' => 4
                ]);
            }
        }
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);
        $user->save();
        return response()->json([
            'status' => 'success',
        ]);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fails',
                'message' => $validator->errors()->first(),
                'errors_code' => 5

            ]);
        }
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'fails',
                'message' => 'Sai Mật Khẩu or Password',
                'code_error' => 6
            ], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->input('remember_me')) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        // dd(Auth::user());
        return response()->json([
            'status' => 'success',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function user(Request $request)
    {
        // dd(Auth::user());
        return response()->json($request->user());
    }
}
