<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;
use Log;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ExcelCollection;


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
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

        return response()->json($body, $statusCode);
    }

    public function excel(Request $request) {

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
        $requestString = 'excelProducts'.$passOnQuery;
        $options = [
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

        $excel_data = [];
        $excel_header = [
            'id' => 'ID',
            'st_article_nr' => 'Artikel-Nr.',
            'st_serial_nr' => 'Serial-Nr.',
            'lifecycle' => 'Status',
            'components_count' => 'Komponenten',
            'production_data_count' => 'Produktionsdaten',
            'production_order_nr' => 'Produktionsauftrag',
            'created_at' => 'Erstellt',
            'new_date' => 'Neues Datum',
            'updated_at' => 'Aktualisiert'
        ];
        array_push($excel_data, $excel_header);

        //convert stdClass object to array to fit excel format
        foreach ($body->data as $item_array) {
            array_push($excel_data, $item_array);
        }

        return Excel::download(new ExcelCollection($excel_data), 'data.xlsx');
    }

    public function enhancedExcel(Request $request) {

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
        $requestString = 'excelProducts'.$passOnQuery;
        $options = [
            'headers' =>[
                'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
                'Accept'        => 'application/json',
                'Content-Type' => 'application/json'
            ]
        ];

        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
        $body = json_decode($response->getBody()->getContents());

        $excel_data = [];
        $excel_header = [
            'id' => 'ID',
            'st_article_nr' => 'st_article_nr',
            'st_serial_nr' => 'st_serial_nr',
            'lifecycle' => 'lifecycle',
            'components_count' => 'components_count',
            'production_data_count' => 'production_data_count',
            'production_order_nr' => 'production_order_nr',
            'created_at' => 'created_at',
//            'updated_at' => 'updated_at',
            'tested_at' => 'tested_at',
            'daisy.state' => 'daisy.state',
            'data.gamma' => 'data.gamma',
            'data.ambient_temp' => 'data.ambient_temp',
            'data.heating_temp' => 'data.heating_temp',
            'data.saturation_red' => 'data.saturation_red',
            'data.wavelength_red' => 'data.wavelength_red',
            'data.luminance_black' => 'data.luminance_black',
            'data.luminance_white' => 'data.luminance_white',
            'data.saturation_blue' => 'data.saturation_blue',
            'data.wavelength_blue' => 'data.wavelength_blue',
            'data.saturation_green' => 'data.saturation_green',
            'data.wavelength_green' => 'data.wavelength_green',
            'data.homogeneity_black' => 'data.homogeneity_black',
            'data.homogeneity_white' => 'data.homogeneity_white',
            'data.black_mura_gradient' => 'data.black_mura_gradient',
            'data.chromatisity_white_x' => 'data.chromatisity_white_x',
            'data.chromatisity_white_y' => 'data.chromatisity_white_y',
            'data.contrast_white_black' => 'data.contrast_white_black',
        ];
        array_push($excel_data, $excel_header);

        //convert stdClass object to array to fit excel format
        foreach ($body->data as $item_array) {
            array_push($excel_data, $item_array);
        }
        return Excel::download(new ExcelCollection($excel_data), 'enhanced_data.xlsx');
    }

    public function destroy(Request $request, $id) {
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $requestString = 'products/'. $id;
        $options = [
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $response = $client->request('DELETE', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        $body = json_decode($response->getBody()->getContents());

        return response()->json($body, $statusCode);
    }


}
