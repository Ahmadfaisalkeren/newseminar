<?php

use App\Models\Order;
use App\Mail\TestEmail;
use App\Events\OrderPaid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\NotificationController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/verify-email/{id}/{token}', [AuthController::class, 'verifyEmail']);
Route::get('/upcomingSeminars', [SeminarController::class, 'upcomingSeminars']);

Route::post('/notification', [OrderController::class, 'notificationCallback']);
Route::post('/payment-completed', [OrderController::class, 'paymentCompletedCallback']);
Route::post('/payment-expired', [OrderController::class, 'paymentExpiredCallback']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/penduduk', [PendudukController::class, 'index'])->name('penduduk');
    Route::post('/penduduk', [PendudukController::class, 'store'])->name('penduduk.store');
    Route::put('/penduduk/{pendudukId}', [PendudukController::class, 'update']);
    Route::delete('/penduduk/{pendudukId}', [PendudukController::class, 'destroy'])->name('penduduk.destroy');

    Route::get('/books', [BookController::class, 'index']);
    Route::post('/book', [BookController::class, 'store']);
    Route::put('/book/{bookId}', [BookController::class, 'update']);
    Route::delete('/book/{bookId}', [BookController::class, 'destroy']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/category/{categoryId}', [CategoryController::class, 'update']);
    Route::delete('/category/{categoryId}', [CategoryController::class, 'destroy']);

    Route::get('/seminars', [SeminarController::class, 'index']);
    Route::get('/seminar/getCategory', [SeminarController::class, 'getCategory']);
    Route::post('/seminar', [SeminarController::class, 'store']);
    Route::get('/seminar/{seminarId}', [SeminarController::class, 'show']);
    Route::put('/seminar/{seminarId}', [SeminarController::class, 'update']);
    Route::delete('/seminar/{seminarId}', [SeminarController::class, 'destroy']);

    Route::post('/transaction', [TransactionController::class, 'createTransaction']);
    Route::get('/my-transaction/{userId}', [TransactionController::class, 'myTransaction']);
    Route::put('/pay-transaction/{transactionId}', [TransactionController::class, 'payTransaction']);
    Route::get('/all-transactions', [TransactionController::class, 'allTransactions']);
    Route::post('/notificationHandler', [TransactionController::class, 'notificationHandler']);

    Route::get('/orders/{userId}', [OrderController::class, 'index']);
    Route::get('/order/{orderId}', [OrderController::class, 'getOrderByOrderId']);
    Route::get('/orderBySeminar/{seminarId}', [OrderController::class, 'getOrderBySeminarId']);
    Route::get('/orders', [OrderController::class, 'allOrders']);
    Route::post('/invoice', [OrderController::class, 'createInvoice']);

    Route::get('notifications', [NotificationController::class, 'index']);
    Route::put('notification/markAllAsRead', [NotificationController::class, 'markAllAsRead']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{userId}', [UserController::class, 'show']);
    Route::put('/user/{userId}', [UserController::class, 'update']);
    Route::delete('/user/{userId}', [UserController::class, 'destroy']);

    // Counter Menus

    Route::get('/countUsers', [UserController::class, 'countUsers']);
    Route::get('/countSeminars', [SeminarController::class, 'countSeminars']);
    Route::get('/countCategories', [CategoryController::class, 'countCategories']);
});


Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
