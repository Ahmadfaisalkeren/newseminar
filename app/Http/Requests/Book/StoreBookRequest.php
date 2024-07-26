<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'image' => 'required|mimes:png,jpg,svg,jpeg|max:3000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Kolom judul harus diisi.',
            'title.string' => 'Kolom judul harus berupa teks.',
            'title.max' => 'Kolom judul tidak boleh lebih dari 255 karakter.',
            'author.required' => 'Kolom penulis harus diisi.',
            'author.string' => 'Kolom penulis harus berupa teks.',
            'author.max' => 'Kolom penulis tidak boleh lebih dari 255 karakter.',
            'description.required' => 'Kolom deskripsi harus diisi.',
            'description.string' => 'Kolom deskripsi harus berupa teks.',
            'price.required' => 'Kolom harga harus diisi.',
            'price.numeric' => 'Kolom harga harus berupa angka.',
            'stock.required' => 'Kolom stok harus diisi.',
            'stock.numeric' => 'Kolom stok harus berupa angka.',
            'image.required' => 'Kolom gambar harus diisi.',
            'image.mimes' => 'Kolom gambar harus berupa file dengan tipe: png, jpg, svg, jpeg.',
            'image.max' => 'Kolom gambar tidak boleh lebih dari 3000 kilobyte.',
        ];
    }
}
