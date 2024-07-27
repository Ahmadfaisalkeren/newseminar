<?php

namespace App\Services;

use App\Models\Seminar;
use App\Models\Category;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * Class SeminarService.
 */
class SeminarService
{
    public function getSeminar()
    {
        return Seminar::with('category')->get();
    }

    public function getUpcomingSeminars()
    {
        return Seminar::with('category')->get();
    }

    public function getCategory()
    {
        return Category::all();
    }

    public function storeSeminar(array $seminarData)
    {
        if (isset($seminarData['image'])) {
            $seminarData['image'] = $this->storeImage($seminarData['image']);
        }

        $seminarData['capacity_left'] = $seminarData['capacity'];

        Seminar::create($seminarData);
    }

    private function storeImage($image)
    {
        $imagePath = 'laravel-seminar';
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $uploadedImage = Cloudinary::upload($image->getRealPath(), [
            'public_id' => $imageName,
            'folder' => $imagePath,
        ])->getSecurePath();

        return $uploadedImage;
    }

    public function getSeminarById($seminarId)
    {
        return Seminar::findOrFail($seminarId);
    }

    public function updateSeminar($seminarId, array $seminarData)
    {
        $seminar = Seminar::findOrFail($seminarId);

        if (isset($seminarData['image'])) {
            $seminarData['image'] = $this->updateImage($seminar, $seminarData['image']);
        }

        $seminar->update($seminarData);

        return $seminar;
    }

    private function updateImage(Seminar $seminar, $image)
    {
        if ($image && $image->isValid()) {
            if ($seminar->image) {
                $this->deleteImage($seminar->image);
            }
            $imagePath = 'laravel-seminar';
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                'public_id' => $imageName,
                'folder' => $imagePath,
            ])->getSecurePath();

            return $uploadedImage;
        }

        return $seminar->image;
    }

    public function deleteSeminar($seminarId)
    {
        $seminar = Seminar::findOrFail($seminarId);

        if ($seminar->image) {
            $this->deleteImage($seminar->image);
        }

        $seminar->delete();

        return $seminar;
    }

    private function deleteImage($image)
    {
        $publicId = pathinfo($image, PATHINFO_FILENAME);
        Cloudinary::destroy('laravel-book/' . $publicId);
    }

    public function countSeminars()
    {
        return Seminar::count();
    }
}
