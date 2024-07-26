<?php

namespace App\Services;

use App\Models\Category;

/**
 * Class CategoryService.
 */
class CategoryService
{
    public function getCategories()
    {
        return Category::all();
    }

    public function storeCategory(array $categoryData)
    {
        Category::create($categoryData);
    }

    public function updateCategory($categoryId, array $categoryData)
    {
        $category = Category::findOrFail($categoryId);
        $category->update($categoryData);

        return $category;
    }

    public function deleteCategory($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        $category->delete();
    }

    public function countCategories()
    {
        return Category::count();
    }
}
