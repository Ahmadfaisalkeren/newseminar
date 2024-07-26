<?php

namespace App\Services;

use Exception;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Seminar;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = config('services.midtrans.isSanitized');
        Config::$is3ds = config('services.midtrans.is3ds');
    }

    public function createTransaction($seminar_id, $user)
    {
        // Find seminar
        $seminar = Seminar::findOrFail($seminar_id);

        // Create transaction
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'seminar_id' => $seminar->id,
            'amount' => $seminar->price,
            'status' => 'pending',
        ]);

        // Generate order_id
        $order_id = 'transaction_' . $transaction->id;

        // Midtrans configuration (repeated for clarity)
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = config('services.midtrans.isSanitized');
        Config::$is3ds = config('services.midtrans.is3ds');

        $params = [
            'transaction_details' => [
                'order_id' => $order_id,
                'gross_amount' => $seminar->price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        // Save snap token to transaction
        $transaction->snap_token = $snapToken;
        $transaction->save();

        return $transaction;
    }

    public function getUserTransactions($userId)
    {
        return Transaction::with('seminar')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function updateTransactionStatus($transactionId, $status)
    {
        $transaction = Transaction::findOrFail($transactionId);
        $transaction->status = $status;
        $transaction->save();

        return $transaction;
    }
}
