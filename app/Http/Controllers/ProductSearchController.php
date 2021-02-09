<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;
use Illuminate\Validation\Rule;


class ProductSearchController extends Controller
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

        return view('productsearch');
    }


    public function products(Request $request) {

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'products?size=10&search_artnr='.$request->search_artnr;
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];


        //$request = $client->createRequest('GET', $baseUrl.$requestString, ['debug' => fopen('php://stderr', 'w')],  $options);   // call API
        //print_r(array($baseUrl.$requestString));

        //$response = $client->request('GET', $baseUrl.$requestString, ['debug' => fopen('php://stderr', 'w')],  $options);   // call API
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

//        echo '<pre>';
//        print_r(array($baseUrl.$requestString, $statusCode, $body));
//        die(__FILE__);

        return response()->json(array('data' => $body->data), $statusCode);
    }


}
