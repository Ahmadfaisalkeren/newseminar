<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index($userId)
    {
        $orders = $this->orderService->fetchOrders($userId);

        return response()->json([
            'status' => 200,
            'message' => 'Data Fetched Successfully',
            'orders' => $orders
        ]);
    }

    public function allOrders()
    {
        $allOrders = $this->orderService->fetchAllOrders();

        return response()->json([
            'status' => 200,
            'message' => 'All Orders Fetched Successfully',
            'allOrders' => $allOrders
        ]);
    }

    public function getOrderByOrderId($orderId)
    {
        $order = $this->orderService->fetchOrderByOrderId($orderId);

        return response()->json([
            'status' => 200,
            'message' => 'Order Fetched Successfully',
            'order' => $order
        ]);
    }

    public function getOrderBySeminarId($seminarId)
    {
        $orderBySeminarID = $this->orderService->fetchOrderBySeminarId($seminarId);

        return response()->json([
            'status' => 200,
            'message' => 'Order Fetched Successfully',
            'orderBySeminarId' => $orderBySeminarID
        ]);
    }

    public function createInvoice(Request $request)
    {
        try {
            $order = $this->orderService->createInvoice($request);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Invoice Sent',
                'order' => $order
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Error',
                'message' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function notificationCallback(Request $request)
    {
        try {
            $this->orderService->handleNotificationCallback($request);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Callback Sent',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Error',
                'message' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function paymentCompletedCallback(Request $request)
    {
        try {
            $this->orderService->handlePaymentCompletedCallback($request);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Payment completed notification received',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Error',
                'message' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function paymentExpiredCallback(Request $request)
    {
        try {
            $this->orderService->handlePaymentExpiredCallback($request);

            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Payment expired notification received',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Error',
                'message' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
