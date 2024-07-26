<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Verification</title>
</head>
<body>
    <h1>Email Verification</h1>
    <p>Dear {{ $name }},</p>
    <p>Thank you for registering. Please click the button below to verify your email address:</p>
    <a href="{{ $verificationUrl }}" style="display:inline-block; padding:10px 20px; background-color:green; color:white; text-decoration:none;">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
</body>
</html>
