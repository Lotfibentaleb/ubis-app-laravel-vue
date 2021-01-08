<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegistrationController extends Controller
{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Index resource
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {

        return view('registration');

        $clients = Client::with('file')->get();

        $clients->each(function ($client) {
            $client->append('avatar');
        });

        return response()->json([
            'data' => $clients
        ]);
    }

}
