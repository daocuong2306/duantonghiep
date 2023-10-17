<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

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
        $id = Auth::user()->id;
        $user = User::find($id);
        $oldAvatar = $user->image;
        // $updateUser = new User();
        if ($request->newpassword) {
            if (Hash::check($request->oldpassword, $user->password) == false) {
                return response()->json([
                    'msg' => "Mật khẩu không đúng"
                ], 422);
            }else{
                $user->password = $request->newpassword;
            }
        } else {
            $user->password = $user->password;
        }
        // dd($user);
        // if ($oldAvatar) {
        //     File::delete(public_path($oldAvatar));
        // }
        
        $user->email = $user->email;
        $user->name = $request->name;
        if ($request->hasFile('image')) {
            $imagePathAvatar = $request->file('image')->store('public/images');
            $imageUrlAvatar = 'storage/images/' . basename($imagePathAvatar);
            $user->image = $imageUrlAvatar;
        }
        $user->save();
        return response()->json([
            'msg' => 'Cập nhập thông tin thành công',
            'data'=>$user
        ]);
    }
}
