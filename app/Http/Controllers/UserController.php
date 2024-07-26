<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getUsers();

        return response()->json([
            'status' => 200,
            'message' => 'Users Data Fetched Successfully',
            'users' => $users
        ]);
    }

    public function countUsers()
    {
        $users = $this->userService->countUsers();

        return response()->json([
            'status' => 200,
            'message' => 'Users Data Fetched Successfully',
            'users' => $users
        ]);
    }

    public function show($userId)
    {
        $user = $this->userService->getUserById($userId);

        return response()->json([
            'status' => 200,
            'message' => 'User Data Fetched Successfully',
            'user' => $user
        ]);
    }

    public function update(UpdateUserRequest $request, $userId)
    {
        $user = $this->userService->updateUser($userId, $request->validated());

        return response()->json([
            'status' => 200,
            'message' => 'User Data Updated Successfully',
            'user' => $user
        ]);
    }

    public function destroy($userId)
    {
        $user = $this->userService->deleteUser($userId);

        return response()->json([
            'status' => 200,
            'message' => 'User Data Deleted Successfully',
            'user' => $user
        ]);
    }
}
