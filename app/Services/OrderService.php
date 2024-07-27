<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use App\Models\Seminar;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Xendit\Invoice\InvoiceItem;
use Xendit\Invoice\CreateInvoiceRequest;
use App\Events\OrderPaid;
use App\Events\OrderStatusUpdated;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class OrderService.
 */
class OrderService
{
    public function __construct()
    {
        Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
    }

    public function fetchOrders($userId)
    {
        return Order::with('seminar')->where('user_id', $userId)->orderBy('created_at', 'desc')->get();
    }

    public function fetchAllOrders()
    {
        return Order::with('seminar')->with('user')->where('status', '=', 'success')->orderBy('created_at', 'desc')->get();
    }

    public function fetchOrderByOrderId($orderId)
    {
        return Order::with('seminar')->with('user')->where('id', $orderId)->first();
    }

    public function fetchOrderBySeminarId($seminarId)
    {
        return Order::with('seminar')->with('user')->where('status', '=', 'success')->where('seminar_id', $seminarId)->get();
    }

    public function createInvoice(Request $request)
    {
        $transactionId = 'Order-' . str_pad(random_int(0, 999999999999999), 15, '0', STR_PAD_LEFT);
        $userName = User::findOrFail($request->input('user_id'));

        if (!$userName) {
            throw new \Exception('User not found');
        }

        $order = new Order;
        $order->transaction_id = $transactionId;
        $order->external_id = $transactionId;
        $order->seminar_id = $request->input('seminar_id');
        $order->user_id = $request->input('user_id');
        $order->amount = $request->input('amount');
        $order->status = 'pending';

        $items = new InvoiceItem([
            'name' => $userName->name,
            'price' => $request->input('amount'),
            'quantity' => 1,
        ]);

        $createInvoice = new CreateInvoiceRequest([
            'external_id' => $transactionId,
            'amount' => (int) $request->input('amount'),
            'payer_email' => $request->input('email') ?? 'default@example.com',
            'description' => 'Payment for seminar',
            'invoice_duration' => 180,
            'items' => [$items],
        ]);

        $apiInstance = new InvoiceApi();
        $generateInvoice = $apiInstance->createInvoice($createInvoice);

        $order->invoice_url = $generateInvoice['invoice_url'];
        $order->save();

        return $order;
    }

    public function handleNotificationCallback(Request $request)
    {
        $getToken = $request->headers->get('x-callback-token');
        $callbackToken = env('XENDIT_CALLBACK_TOKEN');

        if (!$callbackToken) {
            throw new \Exception("Callback token xendit not found", Response::HTTP_NOT_FOUND);
        }

        if ($getToken !== $callbackToken) {
            throw new \Exception("Callback token not valid", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $order = Order::where('external_id', $request->input('external_id'))->first();

        if ($order) {
            if ($request->status == 'PAID') {
                $order->update(['status' => 'success']);
                $seminar = Seminar::find($order->seminar_id);
                if ($seminar && $seminar->capacity_left > 0) {
                    $seminar->decrement('capacity_left');
                }
                broadcast(new OrderStatusUpdated($order));
                broadcast(new OrderPaid($order));
            } else {
                $order->update(['status' => 'failed']);
                broadcast(new OrderStatusUpdated($order));
            }
        }
    }

    public function handlePaymentCompletedCallback(Request $request)
    {
        $getToken = $request->headers->get('x-callback-token');
        $callbackToken = env('XENDIT_CALLBACK_TOKEN');

        if (!$callbackToken) {
            throw new \Exception("Callback token xendit not found", Response::HTTP_NOT_FOUND);
        }

        if ($getToken !== $callbackToken) {
            throw new \Exception("Callback token not valid", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $order = Order::where('external_id', $request->input('external_id'))->first();

        if ($order) {
            if ($request->status == 'COMPLETED') {
                $order->update(['status' => 'completed']);
                broadcast(new OrderStatusUpdated($order));
            }
        }
    }

    public function handlePaymentExpiredCallback(Request $request)
    {
        $getToken = $request->headers->get('x-callback-token');
        $callbackToken = env('XENDIT_CALLBACK_TOKEN');

        if (!$callbackToken) {
            throw new \Exception("Callback token xendit not found", Response::HTTP_NOT_FOUND);
        }

        if ($getToken !== $callbackToken) {
            throw new \Exception("Callback token not valid", Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $order = Order::where('external_id', $request->input('external_id'))->first();

        if ($order && $request->status == 'EXPIRED') {
            $order->update(['status' => 'failed']);
            broadcast(new OrderStatusUpdated($order));
        }
    }
}
