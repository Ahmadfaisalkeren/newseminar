<?php

namespace App\Http\Requests\Seminar;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeminarRequest extends FormRequest
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
            'description' => 'required|string',
            'seminar_date' => 'required|date',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric',
            'capacity' => 'required|numeric',
            'image' => 'required|mimes:png,jpg,svg,jpeg|max:3000',
            'category_id' => 'required',
        ];
    }
}
