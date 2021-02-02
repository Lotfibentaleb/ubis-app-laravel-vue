<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;
use Illuminate\Validation\Rule;

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
    }

    public function articles(Request $request) {

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'articles?size=10&search='.$request->search_artnr;
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


    public function article($id) {

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'articles/'.$id;
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'http_errors'=> false,
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
        $bom = null;
        if( \property_exists($body, 'data') && \property_exists($body->data, 'bom')){
            $bom = json_decode($body->data->bom);
        }
        if( empty($bom) ){
            return response()->json(array('data' => $body->data), $statusCode);
        }

        $articleData = array();
        foreach($bom as $key=>$value){
            /*
             {
            "id": 48798,
            "version": 0,
            "quantity": 1,
            "articleId": 46793,
            "createDate": "2019-10-16 15:16:51.288",
            "articleNumber": "10000214A1",
            "positionNumber": 1,
            "lastModifiedDate": "2019-10-16 15:16:51.288"
            },
            */
            for($quantity=0; $quantity<$value->quantity; $quantity++){
                $requestString = 'articles/'.$value->articleNumber;
                $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
                $articleData[] = json_decode($response->getBody()->getContents())->data;
            }
        };
        $body->data->bom = $articleData;

//        echo '<pre>';
//        print_r(array($baseUrl.$requestString, $statusCode, $body));
//        die(__FILE__);

        return response()->json(array('data' => $body->data), $statusCode);
    }

    /**
     * Create new product including subcomponent, by adding a subcomponent serial nr.
     * $id == '-' or null
     */
    public function createProduct(Request $request, $id, $articleNr = null){
        $requestData = array_merge($request->all(), ['product_id' => $id, 'product_article_nr' => $articleNr]);

        $validator = Validator::make($requestData, [
            'component_article_nr' => 'string|required|between:5,64',
            'component_serial_nr' => 'string|required|between:1,64',
            'product_article_nr' => 'required_if:product_id,-|nullable|string|between:5,64',
            'product_id' => 'exclude_if:product_id,-|required|uuid',    // if product id == - -> skip check
        ]);

        if($validator->fails()){
            return response()->json(['message' =>  'Append component failed. Wrong parameter. '.implode (' ',$validator->errors()->all()).' '.implode('#',$request->all()) ], 422);
        }

        /*{
            "component_article_nr": "10000214A1",
            "component_serial_nr": "ffhfnfnf"
        }*/

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'http_errors'=> false,
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $productNewlyCreated = false;

        $product = null;
        if( empty($id) || $id === '-'){
            // no product ID given -> create product
            $requestString = 'products';
            $response = $client->request('POST', $baseUrl.$requestString, array_merge($options, ['json' => ['st_article_nr' => $articleNr]]));
            $statusCode = $response->getStatusCode();
            if( $statusCode != 201){
                $statusMessage = 'Could not create product.';
                if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                        $responseContent = json_decode((string)$response->getBody(), true);
                        $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                        $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
                }
                return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
            }
            $productNewlyCreated = true;
            // success
        }else{
            // product ID is given, request product
            $requestString = 'products/'.$id;
            $response = $client->request('GET', $baseUrl.$requestString, $options );
            $statusCode = $response->getStatusCode();
            if( $statusCode != 200){
                $statusMessage = 'Could not fetch product.';
                if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                        $responseContent = json_decode((string)$response->getBody(), true);
                        $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                        $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
                }
                return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
            }
            // success
        }
        $product = json_decode((string)$response->getBody());
        $product = $product->data;

        // must have a valid product on that place -> adopt component
        $requestString = 'products/'.$product->id.'/components';
        $response = $client->request('POST', $baseUrl.$requestString, array_merge($options, ['json' => [
            'st_article_nr' => $requestData['component_article_nr'],
            'serial_nr' => $requestData['component_serial_nr']
            ]]));
        $statusCode = $response->getStatusCode();
        if( $statusCode != 200){
            $statusMessage = 'Could not create component.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            if($productNewlyCreated){
                // we have to delete the product on component creation error, otherwise it will tangel around and block serial
                // TODO: missing API to delete product
                // $client->request('DELETE', $baseUrl.$requestString.'/', array_merge($options, ['json' => ['st_article_nr' => $articleNr]]));
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }
        // success, we get back the product on component creation
        $product = json_decode((string)$response->getBody());
        $product = $product->data;
        $componentId = null;
        foreach($product->components as $component){
            if( $component->st_article_nr == $requestData['component_article_nr'] && $component->serial_nr == $requestData['component_serial_nr']){
                // found right one
                $componentId = $component->id;
                break;
            }
        }

        $statusCode = 200;
        return response()->json(array('data' =>[
            'product_serial' => $product->st_serial_nr,
            'product_id' => $product->id,
            'component_id' => $componentId
            ]), $statusCode);
    }

    /**
     * Show product information
     */
    public function showProduct(Request $request, $id, $articleNr = null){
        $requestData = array_merge($request->all(), ['product_id' => $id, 'product_article_nr' => $articleNr]);

        $validator = Validator::make($requestData, [
            'product_article_nr' => 'nullable|string|between:5,64',
            'product_id' => 'nullable|string|between:1,64',    // if product id == - -> skip check
        ]);

        if($validator->fails()){
            return response()->json(['message' =>  'Requesting product failed. Wrong parameter. '.implode (' ',$validator->errors()->all()).' '.implode('#',$request->all()) ], 422);
        }

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'http_errors'=> false,
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $checkUUid = Validator::make(['id' => $id], [
            'id' => 'required|uuid'
        ]);

        $product = null;
        $requestString = 'products/'.$id;
        if( $articleNr != null && $checkUUid->fails() ){
            // article nr given, get product by serial
            $requestString = 'products/'.$id.'?article_nr='.$articleNr;
        }

//        return $requestString;
        //die(__FILE__);
        $response = $client->request('GET', $baseUrl.$requestString, $options);

        $statusCode = $response->getStatusCode();
        if( $statusCode != 200){
            $statusMessage = 'Could not fetch product.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }

        $body = json_decode((string)$response->getBody());
        return response()->json($body, $statusCode);
    }

    /**
     * Delete component by id
     */
    public function deleteComponent(Request $request, $product_id, $component_id){
        $requestData = ['product_id' => $product_id, 'component_id' => $component_id];

        $validator = Validator::make($requestData, [
            'component_id' => 'uuid|required',
            'product_id' => 'uuid|required'
        ]);

        if($validator->fails()){
            return response()->json(['message' =>  'Delete component failed. Wrong parameter. '.implode (' ',$validator->errors()->all()).' '.implode('#',$request->all()) ], 422);
        }

        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $options = [
//            'debug' => fopen('php://stderr', 'w'),
            'http_errors'=> false,
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        // 'products/{id}/components/{componentId}
        $requestString = 'products/'.$product_id.'/components/'.$component_id;
        $response = $client->request('DELETE', $baseUrl.$requestString, $options);
        $statusCode = $response->getStatusCode();
        if( $statusCode != 200){
            $statusMessage = 'Could not delete component.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }
        return response()->json([], $statusCode);
    }
}
