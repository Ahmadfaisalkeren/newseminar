<?php

namespace App\Http\Controllers;

use App\Http\Requests\Seminar\StoreSeminarRequest;
use App\Http\Requests\Seminar\UpdateSeminarRequest;
use App\Services\SeminarService;
use Illuminate\Http\Request;

class SeminarController extends Controller
{
    protected $seminarService;

    public function __construct(SeminarService $seminarService)
    {
        $this->seminarService = $seminarService;
    }

    public function index()
    {
        $seminars = $this->seminarService->getSeminar();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'seminars' => $seminars,
        ], 200);
    }

    public function upcomingSeminars()
    {
        $upcomingSeminars = $this->seminarService->getUpcomingSeminars();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'upcomingSeminars' => $upcomingSeminars,
        ]);
    }

    public function countSeminars()
    {
        $seminars = $this->seminarService->countSeminars();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'seminars' => $seminars,
        ], 200);
    }

    public function getCategory()
    {
        $categories = $this->seminarService->getCategory();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'categories' => $categories,
        ], 200);
    }

    public function store(StoreSeminarRequest $request)
    {
        $seminar = $this->seminarService->storeSeminar($request->validated());

        return response()->json([
            'status' => 200,
            'message' => 'Data Stored Successfully',
            'seminar' => $seminar
        ], 200);
    }

    public function show($seminarId)
    {
        $seminar = $this->seminarService->getSeminarById($seminarId);

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'seminar' => $seminar
        ], 200);
    }

    public function update(UpdateSeminarRequest $request, $seminarId)
    {
        $seminar = $this->seminarService->updateSeminar($seminarId, $request->validated());

        return response()->json([
            'status' => 200,
            'message' => 'Data Updated Successfully',
            'seminar' => $seminar
        ], 200);
    }

    public function destroy($seminarId)
    {
        $this->seminarService->deleteSeminar($seminarId);

        return response()->json([
            'status' => 200,
            'message' => 'Data Deleted Successfully',
        ], 200);
    }

}
