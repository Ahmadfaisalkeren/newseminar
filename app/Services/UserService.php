<?php

namespace App\Services;

use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * Class UserService.
 */
class UserService
{
    public function getUsers()
    {
        return User::where('role', 'user')->get();
    }

    public function getUserById($userId)
    {
        return User::findOrFail($userId);
    }

    public function updateUser($userId, array $userData)
    {
        $user = User::findOrFail($userId);

        $user->name = $userData['name'] ?? $user->name;
        $user->email = $userData['email'] ?? $user->email;

        if (isset($userData['image'])) {
            $userData['image'] = $this->updateImage($user, $userData['image']);
        }

        $user->update($userData);
        return $user;
    }

    private function updateImage($user, $image)
    {
        if ($image && $image->isValid()) {
            if ($user->image) {
                $this->deleteImage($user->image);
            }
            $imagePath = 'laravel-user';
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                'public_id' => $imageName,
                'folder' => $imagePath,
            ])->getSecurePath();

            return $uploadedImage;
        }
    }

    public function deleteUser($userId)
    {
        $user = User::findOrFail($userId);
        if ($user->image) {
            $this->deleteImage($user->image);
        }
        $user->delete();

        return $user;
    }

    private function deleteImage($image)
    {
        $publicId = pathinfo($image, PATHINFO_FILENAME);
        Cloudinary::destroy('laravel-book/' . $publicId);
    }

    public function countUsers()
    {
        return User::where('role', 'user')->where('email_verified_at', '!=', null)->count();
    }
}
