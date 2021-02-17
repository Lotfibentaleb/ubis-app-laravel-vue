<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;
use Illuminate\Validation\Rule;
use Carbon\Carbon;


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


    public function productiondatadaisy(Request $request, $pid, $did){
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');

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

        $requestString = 'products/'.$pid.'/section/'.$did;
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        if( $statusCode != 200 ){
            $statusMessage = 'Could not fetch production values.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }

        $body = json_decode($response->getBody()->getContents());
        $measurement = $body->data;
/*
        "gamma": 0,
        "ambient_temp": 0,
        "heating_temp": 0,
        "saturation_red": 0.9198821367229668,
        "wavelength_red": 620,
        "luminance_black": 1.2980340255024032,
        "luminance_white": 1248.0858827623174,
        "saturation_blue": 0.915708555229935,
        "wavelength_blue": 467,
        "saturation_green": 0.9037560064233375,
        "wavelength_green": 548,
        "homogeneity_black": 40,
        "homogeneity_white": 86,
        "chromatisity_white_x": 0.32703114572850656,
        "chromatisity_white_y": 0.3438924966399338,
        "contrast_white_black": 0
*/
        $requestString = 'products/'.$pid;
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
        $statusCode = $response->getStatusCode();
        if( $statusCode != 200 ){
            $statusMessage = 'Could not fetch product information.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }

        $body = json_decode($response->getBody()->getContents());
        $productionInformation = $body->data->production_information;
        $productionSection = null;
        foreach($productionInformation as $key=>$value){
            if( $value->production_section_template->id == $did){
                $productionSection = $value;
                break;
            }
        }

        $resultList = array();

        // itterate to all possible measurements
        foreach($productionSection->production_section_template->data as $value){
            if( \property_exists($measurement, $value->title)){
                $title = $value->title;
                $measure = $measurement->$title;
                if( $value->type == 'bool'){

                }else
                if( $value->type == 'integer'){

                }else
                if( $value->type == 'double'){
                    $measure = round($measure, 7, PHP_ROUND_HALF_UP);
                }

                $result = 'ok';
                if( $value->strict ){
                    $result = ($value->nominal == $measure)?'ok':'nok';
                }else{
                    $result = ($measure >= $value->min && $measure <= $value->max)?'ok':'nok';
                }
                $entry['title'] = $title;
                $entry['max'] = $value->max;
                $entry['min'] = $value->min;
                $entry['nominal'] = $value->nominal;
                $entry['unit'] = $value->unit;
                $entry['strict'] = $value->strict;
                $entry['result'] = $result;
                $entry['measurement'] = $measure;
                $resultList[] = $entry;
            }
        }

        return response()->json(array('data' => $resultList), $statusCode);
    }


    public function productiondatabacklight(Request $request, $pid, $did){
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');

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

        $requestString = 'products/'.$pid.'/section/'.$did;
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
    	$statusCode = $response->getStatusCode();
        if( $statusCode != 200 ){
            $statusMessage = 'Could not fetch production values.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }

        $body = json_decode($response->getBody()->getContents());
        $measurement = $body->data;
/*
        "time_end": "2021-02-04T15:37:42.791389Z",
        "time_start": "2021-02-04T15:36:56.285985Z",
        "vacuum_FPC": -0.5992286205291748,
        "vacuum_LCD": -0.613935649394989,
        "clean_glass": true,
        "force_timeseries": [
            {
                "time": "2021-02-04T15:37:16.102042Z",
                "value": 4.147378361025204,
                "value_pressure": 2.298437835413629
            },
        "vacuum_backlight": 0.0008696710574440658,
        "visual_inspection_lcd": true,
        "visual_inspection_product": true,
        "visual_inspection_backlight": true

*/
        $requestString = 'products/'.$pid;
        $response = $client->request('GET', $baseUrl.$requestString, $options);   // call API
        $statusCode = $response->getStatusCode();
        if( $statusCode != 200 ){
            $statusMessage = 'Could not fetch product information.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            return response()->json(['code' => $statusCode, 'error' =>  $statusMessage], $statusCode);
        }

        $body = json_decode($response->getBody()->getContents());
        $productionInformation = $body->data->production_information;
        $productionSection = null;
        foreach($productionInformation as $key=>$value){
            if( $value->production_section_template->id == $did){
                $productionSection = $value;
                break;
            }
        }

        $resultList = array();

        $timeseries_data = array();
        $timeseries_labels = array();   // labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']

        // itterate to all possible measurements
        foreach($productionSection->production_section_template->data as $value){
            if( \property_exists($measurement, $value->title)){
                $title = $value->title;
                $measure = $measurement->$title;
                if( str_contains($value->title, 'timeseries')){
                    // don't put timeseries on table
                    // todo: put to function
                    $timestamp = null;
                    $valueLabel = str_replace('_timeseries', '', $value->title);
                    $tsCount = 0;
                    foreach($measure as $tsentry){
//                        if( $tsCount++ > 20) break;
                        // label
                        $datetimeValueEntry = new Carbon($tsentry->time);
                        $timestamp = ($timestamp==null)?$datetimeValueEntry:$timestamp;
                        $timeseries_labels[] = $datetimeValueEntry->diffInMilliseconds($timestamp);

                        // value
                        foreach($tsentry as $entryProperty=>$entryValue){
                            //$entryValue = ($entryValue>600)?600:$entryValue; // plausible?
                            if( $entryProperty == 'time') continue;
                            if( $entryProperty == 'value'){
                                $timeseries_data[$valueLabel][] = $entryValue;
                            }else{
                                $property = str_replace('value_', '', $entryProperty);
                                $timeseries_data[$property][] = $entryValue;
                            }
                        }
                    }
                    continue;
                }
                if( $value->type == 'bool'){

                }else
                if( $value->type == 'integer'){

                }else
                if( $value->type == 'double'){
                    $measure = round($measure, 7, PHP_ROUND_HALF_UP);
                }

                $result = 'ok';
                if( $value->strict ){
                    $result = ($value->nominal == $measure)?'ok':'nok';
                }else{
                    $result = ($measure >= $value->min && $measure <= $value->max)?'ok':'nok';
                }
                $entry['title'] = $title;
                $entry['max'] = $value->max;
                $entry['min'] = $value->min;
                $entry['nominal'] = $value->nominal;
                $entry['unit'] = $value->unit;
                $entry['strict'] = $value->strict;
                $entry['result'] = $result;
                $entry['measurement'] = $measure;
                $resultList[] = $entry;
            }
        }

        $resultdataset['table'] = $resultList;

        // now generate timeseries data
        /*
        {
            datasets: [
              {
                fill: false,
                borderColor: chartConfig.chartColors.default.primary,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: chartConfig.chartColors.default.primary,
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: this.randomChartData(9)
              },
              {
                fill: false,
                borderColor: chartConfig.chartColors.default.danger,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: chartConfig.chartColors.default.danger,
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: this.randomChartData(9)
              }
            ],
            labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
          },
          */

        $colors = array(
            1 => 'rgb(33, 72, 245)',
            2 => 'rgb(245, 128, 33)',
            3 => 'rgb(91, 194, 6)',
        );

        $diagramStruct = array();
        $diagramStruct['datasets'] = array();
        $diagramStruct['labels'] = $timeseries_labels;

        $colorIndex = 1;
        foreach($timeseries_data as $tsDataName => $tsDataValues){
            $dataset = array(
                'label' => $tsDataName,
                'fill' => false,
                'borderColor' => $colors[$colorIndex],
                'borderWidth' => 2,
                'borderDash' => [],
                'borderDashOffset' => 0.0,
                'pointBackgroundColor' => $colors[$colorIndex],
                'pointBorderColor' => 'rgba(255,255,255,0)',
                'pointHoverBackgroundColor' => $colors[$colorIndex],
                'pointBorderWidth' => 20,
                'pointHoverRadius' => 5,
                'pointHoverBorderWidth' => 15,
                'pointRadius' => 3,
                'yAxisID' => ($colorIndex==1)?'left-y-axis':'right-y-axis',
                'data' => $tsDataValues
            );
            $diagramStruct['datasets'][] = $dataset;
            $colorIndex++;
        }

//        $diagramStruct['yLabels'] = range( -50, 600, 1);
//        xLabels
//        yLabels

        $resultdataset['chart'] = $diagramStruct;

        return response()->json(array('data' => $resultdataset), $statusCode);
    }

}
