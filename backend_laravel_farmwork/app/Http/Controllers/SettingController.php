<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function setingshope(Request $request)
    {
        $admin = User::find(1);
        $infor = Setting::find(1);
        $oldAvatar = $admin->image;
        $oldLogo = $infor->logo;
        $validator = Validator::make($request->all(), [
            'logo' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'avatar' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()

            ], 422);
        } else {
            if ($oldAvatar) {
              File::delete(public_path($oldAvatar));
            }
            if ($oldLogo) {
                File::delete(public_path($oldLogo));
            }
            if ($request->oldpassword && Hash::check($request->oldpassword, $admin->password) == false) {
                return response()->json([
                    'msg' => "Mật khẩu không đúng"
                ], 422);
            }
            if ($request->hasFile('avatar')) {
                $imagePathAvatar = $request->file('avatar')->store('public/images');
                $imageUrlAvatar = 'storage/images/' . basename($imagePathAvatar);
                $admin->image = $imageUrlAvatar;
            }
            $admin->password = Hash::make($request->newpassword);
            $admin->save();

            if ($request->hasFile('logo')) {
                $imagePath = $request->file('logo')->store('public/images');
                $imageUrl = 'storage/images/' . basename($imagePath);
                $infor->logo = $imageUrl;
            }
            $infor->nameshop = $request->nameshop;
            $infor->address = $request->address;
            $infor->city = $request->city;
            $infor->emailshop = $request->emailshop;
            $infor->phone = $request->phone;
            $infor->website_link = $request->website_link;
            $infor->facebook_link = $request->facebook_link;
            $infor->twitter_link = $request->twitter_link;
            $infor->instagram_link = $request->instagram_link;
            $infor->save();
            return response()->json([
                'msg' => "Successfully updated"
            ]);
        }
    }
    public function InforShop()
    {
        $admin = User::find(1);
        $infor = Setting::find(1);
        $Allinfor = [
            'avatar' => $admin->image,
            'infor' => $infor,
        ];
        return response()->json([
            'data' => $Allinfor,
            'isOke' => 'true',
        ], 200);
    }
}
