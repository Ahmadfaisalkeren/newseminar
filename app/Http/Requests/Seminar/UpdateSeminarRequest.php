<?php

namespace App\Http\Requests\Seminar;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeminarRequest extends FormRequest
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
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'seminar_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'capacity' => 'nullable|numeric',
            'image' => 'nullable|mimes:png,jpg,svg,jpeg|max:3000',
            'category_id' => 'nullable',
        ];
    }
}
