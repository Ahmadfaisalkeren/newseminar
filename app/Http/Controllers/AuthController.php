<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthenticationService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');
        $result = $this->authService->login($credentials);

        if ($result['status'] === 'error') {
            return response()->json(['error' => $result['message']], 401);
        }

        return response()->json($result, 200);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->only('name', 'email', 'password');
        $result = $this->authService->register($data);

        return response()->json($result, 201);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function verifyEmail($id, $token): JsonResponse
    {
        $result = $this->authService->verifyEmail($id, $token);

        if ($result['status'] === 'error') {
            return response()->json(['error' => $result['message']], 400);
        }

        return response()->json($result, 200);
    }
}
