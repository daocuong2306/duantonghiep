<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SendGrid\Mail\Mail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $toEmail = $request->input('email');
        $subject = $request->input('subject');
        $message = $request->input('message');

        $email = new Mail();
        $email->setFrom('hoangcongtien040821@gmail.com', 'Tiến');
        $email->setSubject($subject);
        $email->addTo($toEmail);
        $email->addContent($message);

        $sendgrid = new \SendGrid(config('services.sendgrid.api_key'));

        try {
            $response = $sendgrid->send($email);
            return response()->json([
                'message' => 'Email sent successfully',

            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send email'], 500);
        }
    }
}
 