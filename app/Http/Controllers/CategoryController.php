<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getCategories();

        return response()->json([
            'status' => 200,
            'message' => "Data Fetched Successfully",
            'categories' => $categories,
        ], 200);
    }

    public function countCategories()
    {
        $categories = $this->categoryService->countCategories();

        return response()->json([
            'status' => 200,
            'message' => "Data Fetched Successfully",
            'categories' => $categories,
        ], 200);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryService->storeCategory($request->validated());

        return response()->json([
            'status' => 200,
            'message' => "Category Created Successfully",
            'category' => $category,
        ], 200);
    }

    public function update(UpdateCategoryRequest $request, $categoryId)
    {
        $category = $this->categoryService->updateCategory($categoryId, $request->validated());

        return response()->json([
            'status' => 200,
            'message' => "Category Updated Successfully",
            'category' => $category,
        ], 200);
    }

    public function destroy($categoryId)
    {
        $category = $this->categoryService->deleteCategory($categoryId);

        return response()->json([
            'status' => 200,
            'message' => "Category Deleted Successfully",
            'category' => $category,
        ], 200);
    }
}
