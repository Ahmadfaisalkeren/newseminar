<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Midtrans\Snap;
use App\Models\Seminar;
use Midtrans\Notification;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use Xendit\Invoice\InvoiceItem;

class TransactionController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
    }

    // public function createTransaction(Request $request)
    // {
    //     $orderId = 'Order-' . str_pad(random_int(0, 999999999999999), 15, '0', STR_PAD_LEFT);
    //     // Create the transaction entry in your database
    //     $transaction = Transaction::create([
    //         'user_id' => $request->user_id,
    //         'seminar_id' => $request->seminar_id,
    //         'status' => 'pending',
    //         'amount' => $request->amount,
    //         'order_id' => $orderId,
    //     ]);

    //     // Prepare Midtrans transaction parameters
    //     $params = [
    //         'transaction_details' => [
    //             'order_id' => $orderId,
    //             'gross_amount' => $transaction->amount,
    //         ],
    //         'customer_details' => [
    //             'first_name' => $request->first_name,
    //             'last_name' => $request->last_name,
    //             'email' => $request->email,
    //             'phone' => $request->phone,
    //         ],
    //         'expiry' => [
    //             'start_time' => date("Y-m-d H:i:s T"),
    //             'unit' => 'minute', // options: second, minute, hour, day
    //             'duration' => 5 // set to 1 minute for quick testing
    //         ]
    //     ];

    //     // Get the Snap token
    //     $snapToken = \Midtrans\Snap::getSnapToken($params);

    //     // Save the snap token to the database
    //     $transaction->snap_token = $snapToken;
    //     $transaction->save();

    //     return response()->json(['snap_token' => $snapToken]);
    // }

    public function myTransaction($userId)
    {
        $myTransaction = Transaction::with('seminar')->where('user_id', $userId)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'My Transaction Fetched Successfully',
            'myTransaction' => $myTransaction,
        ], 200);
    }

    public function allTransactions()
    {
        $allTransactions = Transaction::with('seminar')->with('user')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'All Transaction Fetched Successfully',
            'allTransactions' => $allTransactions
        ], 200);
    }

    // public function notificationHandler(Request $request)
    // {
    //     $payload = $request->getContent();
    //     Log::info('Notification received: ' . $payload);
    //     $notifications = json_decode($payload);

    //     $transaction_status = $notifications->transaction_status;
    //     $payment_type = $notifications->payment_type;
    //     $order_id = $notifications->order_id;
    //     $fraud = $notifications->fraud_status;

    //     $data = Transaction::where('order_id', $order_id)->first();

    //     if ($transaction_status == 'capture') {
    //         if ($payment_type == 'credit_card') {
    //             if ($fraud == 'challenge') {
    //                 $data->update([
    //                     'status' => 'pending'
    //                 ]);
    //             } else {
    //                 $data->update([
    //                     'status' => 'settlement'
    //                 ]);
    //             }
    //         }
    //     } elseif ($transaction_status == 'settlement') {
    //         $data->update([
    //             'status' => 'success'
    //         ]);
    //     } elseif ($transaction_status == 'deny') {
    //         $data->update([
    //             'status' => 'deny'
    //         ]);
    //     } elseif ($transaction_status == 'cancel') {
    //         $data->update([
    //             'status' => 'cancel'
    //         ]);
    //     } elseif ($transaction_status == 'expire') {
    //         $data->update([
    //             'status' => 'expire'
    //         ]);
    //     }
    // }
}
