<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;


class test extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $data = DB::connection('pgsql_pc')->select('');

        // Fetch current production
        $client = new Client();
        $baseUrl = env('PC_SERVICE_BASE_URL');

        $callUrl = $baseUrl.'products/'.$id;

        $articleNr = null;
        if( !empty($articleNr) ){
            // search for serial nr. with given article nr.
            $callUrl = $baseUrl.'products/'.$id.'?article_nr='.$articleNr;
        }

        try{
            $response = $client->request('GET', $callUrl, ['json'] );   // call API by serial+article-nr.
        }catch(Throwable $e){
            return response(['code' => $e->getCode(), 'error' =>  'Product could not be requested.'], 404);
            // .$e->getMessage()
        }

    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

/*        if( !empty($searchValue) ){
            $requestString = 'articles?size='.$perPage.'&short=0&search_artnr='.$searchValue.'&search_name='.$searchValue;
        }
*/
    	$response = $client->request('GET', $baseUrl.$requestString);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

        return response()->json($body->data, $statusCode);

        echo 'Hello World';
    }
}
