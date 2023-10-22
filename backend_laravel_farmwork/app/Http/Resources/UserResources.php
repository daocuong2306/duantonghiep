<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $this->image,
            'email_verified_at' => $this->email_verified_at,
            'password' => $this->password,
            'role' => $this->role,
            'remember_token' => $this->rememberToken,
            'created-at' => $this->created_at,
            'updated-at' => $this->updated_at

        ];
    }
}
