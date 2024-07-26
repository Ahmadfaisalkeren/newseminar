<?php

namespace App\Services;

use App\Models\Book;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

/**
 * Class BookService.
 */
class BookService
{
    public function getBooks()
    {
        return Book::all();
    }

    public function storeBook(array $bookData)
    {
        if (isset($bookData['image'])) {
            $bookData['image'] = $this->storeImage($bookData['image']);
        }

        Book::create($bookData);
    }

    public function storeImage($image)
    {
        $imagePath = 'laravel-book';
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $uploadedImage = Cloudinary::upload($image->getRealPath(), [
            'public_id' => $imageName,
            'folder' => $imagePath,
        ])->getSecurePath();

        return $uploadedImage;
    }

    public function updateBook(string $bookId, array $bookData)
    {
        $book = Book::findOrFail($bookId);

        if (isset($bookData['image'])) {
            $bookData['image'] = $this->updateImage($book, $bookData['image']);
        }

        $book->update($bookData);

        return $book;
    }

    private function updateImage(Book $book, $image)
    {
        if ($image && $image->isValid()) {
            if ($book->image) {
                $this->deleteImage($book->image);
            }

            $imagePath = 'laravel-book';
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                'public_id' => $imageName,
                'folder' => $imagePath,
            ])->getSecurePath();

            return $uploadedImage;
        }

        return $book->image;
    }

    public function deleteBook(string $bookId)
    {
        $book = Book::findOrFail($bookId);

        if ($book->image) {
            $this->deleteImage($book->image);
        }

        $book->delete();

        return $book;
    }

    private function deleteImage($image)
    {
        $publicId = pathinfo($image, PATHINFO_FILENAME);
        Cloudinary::destroy('laravel-book/' . $publicId);
    }
}
