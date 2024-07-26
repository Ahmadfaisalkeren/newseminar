<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::orderBy('created_at', 'desc')->take(5)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'notifications' => $notifications,
        ]);
    }

    public function markAllAsRead()
    {
        Notification::where('is_read', 0)->update(['is_read' => 1]);

        return response()->json([
            'status' => 200,
            'message' => 'All notifications marked as read',
        ]);
    }
}
