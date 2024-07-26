<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PendudukService;
use App\Http\Requests\Penduduk\StorePendudukRequest;
use App\Http\Requests\Penduduk\UpdatePendudukRequest;

class PendudukController extends Controller
{
    protected $pendudukService;

    public function __construct(PendudukService $pendudukService)
    {
        $this->pendudukService = $pendudukService;
    }

    public function index()
    {
        $penduduk = $this->pendudukService->getPenduduk();

        return response()->json([
            'status' => 200,
            'message' => 'Penduduk Fetched Successfully',
            'penduduk' => $penduduk,
        ], 200);
    }

    public function store(StorePendudukRequest $request)
    {
        $penduduk = $this->pendudukService->storePenduduk($request->validated());

        return response()->json([
            'status' => 200,
            'message' => 'Data created successfully',
            'penduduk' => $penduduk,
        ], 200);
    }

    public function update(UpdatePendudukRequest $request, $pendudukId)
    {
        $penduduk = $this->pendudukService->updatePenduduk($pendudukId, $request->validated());

        return response()->json(
            [
                'message' => 'Penduduk Updated Successfully',
                'status' => 200,
                'Penduduk' => $penduduk,
            ],
            200,
        );
    }

    public function destroy($pendudukId)
    {
        $penduduk = $this->pendudukService->deletePenduduk($pendudukId);

        return response()->json(
            [
                'status' => 200,
                'message' => 'Penduduk Deleted Successfully',
                'penduduk' => $penduduk
            ],
            200,
        );
    }
}
