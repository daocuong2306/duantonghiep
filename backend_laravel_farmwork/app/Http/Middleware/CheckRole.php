<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next): Response
    {   $user = \Illuminate\Support\Facades\Auth::user();
        // dd($user);
        // dd($user);
        if ( Auth::check()&& $user->role === 0) {
            return $next($request);
        }
         
        return response()->json(['message' => 'You are not Admin'], 401);
        
    }
}
