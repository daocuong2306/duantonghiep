<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserSettingController extends Controller
{
    public function inforUsser()
    {
        $id = Auth::user()->id;
        $user = User::find($id);
        return response()->json([
            'data' => $user,
            'isOk' => 'true',
        ], 200);
    }
    public function editUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()

            ], 422);
        } else {
            $password='';
            $id = Auth::user()->id;
            $user = User::find($id);
            $oldAvatar = $user->image;
            if ($request->newpassword) {
                if (Hash::check($request->oldpassword, $user->password) == false) {
                    return response()->json([
                        'msg' => "Mật khẩu không đúng"
                    ], 422);
                } else {
                    $user->password = Hash::make($request->newpassword);
                    $password='update new password';
                }
            } else {
                $user->password = $user->password;
            }
            if ($oldAvatar) {
                File::delete(public_path($oldAvatar));
            }

            $user->email = $user->email;
            $user->name = $request->name;
            if ($request->age) {
                

                $user->age = $request->age;
            }
            if ($request->phone) {
                $user->phone = $request->phone;
            }
            if ($request->address) {
                $user->address = $request->address;
            }
            if ($request->hasFile('image')) {
                $imagePathAvatar = $request->file('image')->store('public/images');
                $imageUrlAvatar = 'storage/images/' . basename($imagePathAvatar);
                $user->image = $imageUrlAvatar;
            }
            $user->save();
            return response()->json([
                'msg' => 'Cập nhập thông tin thành công',
                'data' => $user,
                'password'=>$password
            ]);
        }
    }
}
