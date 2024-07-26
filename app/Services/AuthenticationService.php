<?php

namespace App\Services;

use App\Mail\VerificationEmail;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthenticationService
{
    public function register($data)
    {
        $verificationToken = Str::random(64);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verification_token' => $verificationToken,
        ]);

        Mail::to($user->email)->send(new VerificationEmail($user));

        return $user;
    }

    public function login(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if (is_null($user->email_verified_at)) {
                Auth::logout();
                return [
                    'status' => 'error',
                    'message' => 'Your email address is not verified.',
                ];
            }

            /** @var \App\Models\User $user **/
            $token = $user->createToken('auth_token', ['expires' => now()->addHours(24)])->plainTextToken;

            return [
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Invalid credentials',
        ];
    }

    public function verifyEmail($id, $token)
    {
        $user = User::where('id', $id)->where('email_verification_token', $token)->first();

        if (!$user) {
            return [
                'status' => 'error',
                'message' => 'Invalid verification token or user ID',
            ];
        }

        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->save();

        return [
            'status' => 'success',
            'message' => 'Email verified successfully',
        ];
    }
}
