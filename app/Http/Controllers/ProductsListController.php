<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;
use Illuminate\Validation\Rule;


class ProductsListController extends Controller
{
    /**
     * Index resource
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) {

        $query = $request->query();
        $passOnQuery = "";
        // set given query parameters, to be able to forward them
        if( count($query) ){
            $passOnQuery .= '?';
            foreach($query as $key=>$value){
                $passOnQuery .= $key.'='.urlencode($value).'&';
            }
        }

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'products'. $passOnQuery;
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        //$response = $client->request('GET', $baseUrl.$requestString, ['debug' => fopen('php://stderr', 'w')],  $options);   // call API
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

//        echo '<pre>';
//        print_r(array($baseUrl.$requestString, $statusCode, $body));
//        die(__FILE__);

        return response()->json($body, $statusCode);
    }

    public function destroy(Request $request, $id) {
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'products/'. $id;
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        //$response = $client->request('GET', $baseUrl.$requestString, ['debug' => fopen('php://stderr', 'w')],  $options);   // call API
        $response = $client->request('DELETE', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

//        echo '<pre>';
//        print_r(array($baseUrl.$requestString, $statusCode, $body));
//        die(__FILE__);

        return response()->json($body, $statusCode);
    }


}
