<?php

namespace App\Services;

use App\Models\Penduduk;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * Class PendudukService.
 */
class PendudukService
{
    public function getPenduduk()
    {
        return Penduduk::all();
    }

    public function storePenduduk(array $data)
    {
        if (isset($data['image'])) {
            $data['image'] = $this->storeImage($data['image']);
        }
        Penduduk::create($data);
    }

    private function storeImage($image)
    {
        $imagePath = 'laravel-penduduk';
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $uploadedImage = Cloudinary::upload($image->getRealPath(), [
            'public_id' => $imageName,
            'folder' => $imagePath,
        ])->getSecurePath();

        return $uploadedImage;
    }

    public function updatePenduduk(string $pendudukId, array $data)
    {
        $penduduk = Penduduk::findOrFail($pendudukId);

        if (isset($data['image'])) {
            $data['image'] = $this->updateImage($penduduk, $data['image']);
        }

        $penduduk->update($data);

        return $penduduk;
    }

    private function updateImage(Penduduk $penduduk, $image)
    {
        if ($image && $image->isValid()) {
            if ($penduduk->image) {
                $this->deleteImage($penduduk->image);
            }

            $imagePath = 'laravel-penduduk';
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                'public_id' => $imageName,
                'folder' => $imagePath,
            ])->getSecurePath();

            return $uploadedImage;
        }
        return $penduduk->image;
    }

    public function deletePenduduk(string $pendudukId)
    {
        $penduduk = Penduduk::findOrFail($pendudukId);

        if ($penduduk->image) {
            $this->deleteImage($penduduk->image);
        }

        $penduduk->delete();

        return $penduduk;
    }

    private function deleteImage($image)
    {
        $publicId = pathinfo($image, PATHINFO_FILENAME);
        Cloudinary::destroy('laravel-penduduk/' . $publicId);
    }
}
