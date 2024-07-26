<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookService;
use App\Http\Requests\Book\StoreBookRequest;
use App\Http\Requests\Book\UpdateBookRequest;
use Illuminate\Validation\ValidationException;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function index()
    {
        $books = $this->bookService->getBooks();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'books' => $books,
        ], 200);
    }

    public function store(StoreBookRequest $request)
    {
        try {
            $book = $this->bookService->storeBook($request->validated());

            return response()->json([
                'status' => 200,
                'message' => 'Data Stored Successfully',
                'book' => $book
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 422,
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function update(UpdateBookRequest $request, $bookId)
    {
        $book =  $this->bookService->updateBook($bookId, $request->validated());

        return response()->json([
            'status' => 200,
            'message' => 'Data Updated Successfully',
            'book' => $book,
        ], 200);
    }

    public function destroy(string $bookId)
    {
        $book =  $this->bookService->deleteBook($bookId);

        return response()->json([
            'status' => 200,
            'message' => 'Data Deleted Successfully',
            'book' => $book
        ]);
    }
}
