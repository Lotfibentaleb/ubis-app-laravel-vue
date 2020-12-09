<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;


class test extends Controller
{

    public function showDaisy($id)
    {

        $data = DB::connection('pgsql_pc')->select('select distinct on (products.st_serial_nr) products.st_serial_nr, products.lifecycle, products.created_at as products_created_at, device_records."data", device_records.state, device_records.note, device_records.production_section_template_id , device_records.created_at as device_records_created_at
        FROM products
        left JOIN device_records
        ON products.id = device_records.products_id
        where products.st_article_nr = \''.$id.'\'
        order by products.st_serial_nr,device_records.created_at desc;
        ');

        $cols = array('nr', 'serial', 'serial_device', 'product_creation', 'test_date', 'state', 'note',
        'luminance_white',
        'luminance_black',
        'chromatisity_white_x',
        'chromatisity_white_y',
        'wavelength_red',
        'saturation_red',
        'wavelength_green',
        'saturation_green',
        'wavelength_blue',
        'saturation_blue',
        'contrast_white_black',
        'homogeneity_white',
        'homogeneity_black',
        'gamma',
        'ambient_temp'
        );

        // heading
        echo '<tr>';
        foreach($cols as $key=>$value){
            echo '<th>'.$value.'</th>';
        }
        echo '</tr>';


        $table = array();
        $count=1;
        foreach( $data as $product_entry){
            echo "<tr>";
            /*
              [0] => stdClass Object
        (
            [st_serial_nr] => 000001
            [lifecycle] => 0
            [products_created_at] => 2020-10-19 14:30:05.525
            [data] =>
            [state] =>
            [note] =>
            [production_section_template_id] =>
            [device_records_created_at] =>
        )
            */
            $dataset['nr'] = $count++;
            $dataset['serial'] = '';
            $dataset['serial_device'] = $product_entry->st_serial_nr;
            $dataset['product_creation'] = $product_entry->products_created_at;
            $dataset['test_date'] = $product_entry->device_records_created_at;
            $dataset['state'] = $product_entry->state;
            $dataset['note'] = $product_entry->note;

            echo '<td>'.$dataset['nr'].'</td>';
            echo '<td>'.$dataset['serial'].'</td>';
            echo '<td>'.$dataset['serial_device'].'</td>';
            echo '<td>'.$dataset['product_creation'].'</td>';
            echo '<td>'.$dataset['test_date'].'</td>';
            echo '<td>'.$dataset['state'].'</td>';
            echo '<td>'.$dataset['note'].'</td>';

/*
{
  "gamma": 2.3,
  "ambient_temp": 30,
  "heating_temp": 22,
  "saturation_red": 80,
  "wavelength_red": 800,
  "luminance_black": 50,
  "luminance_white": 50,
  "saturation_blue": 10,
  "wavelength_blue": 600,
  "saturation_green": 20,
  "wavelength_green": 300,
  "homogeneity_black": 1,
  "homogeneity_white": 99,
  "chromatisity_white_x": 50,
  "chromatisity_white_y": 50,
  "contrast_white_black": 100
}
*/

            $measurement = \json_decode($product_entry->data);
            /*
            echo '<pre>';
            print_r($measurement);
            echo '</pre>';
            */
            $dataset['luminance_white'] = ($measurement != NULL && property_exists ($measurement, 'luminance_white'))?$measurement->luminance_white:0;
            $dataset['luminance_black'] = ($measurement != NULL && property_exists ($measurement, 'luminance_black'))?$measurement->luminance_black:0;
            $dataset['chromatisity_white_x'] = ($measurement != NULL && property_exists ($measurement, 'chromatisity_white_x'))?$measurement->chromatisity_white_x:0;
            $dataset['chromatisity_white_y'] = ($measurement != NULL && property_exists ($measurement, 'chromatisity_white_y'))?$measurement->chromatisity_white_y:0;
            $dataset['wavelength_red'] = ($measurement != NULL && property_exists ($measurement, 'wavelength_red'))?$measurement->wavelength_red:0;
            $dataset['saturation_red'] = ($measurement != NULL && property_exists ($measurement, 'saturation_red'))?$measurement->saturation_red:0;
            $dataset['wavelength_green'] = ($measurement != NULL && property_exists ($measurement, 'wavelength_green'))?$measurement->wavelength_green:0;
            $dataset['saturation_green'] = ($measurement != NULL && property_exists ($measurement, 'saturation_green'))?$measurement->saturation_green:0;
            $dataset['wavelength_blue'] = ($measurement != NULL && property_exists ($measurement, 'wavelength_blue'))?$measurement->wavelength_blue:0;
            $dataset['saturation_blue'] = ($measurement != NULL && property_exists ($measurement, 'saturation_blue'))?$measurement->saturation_blue:0;
            $dataset['contrast_white_black'] = ($measurement != NULL && property_exists ($measurement, 'contrast_white_black'))?$measurement->contrast_white_black:0;
            $dataset['homogeneity_white'] = ($measurement != NULL && property_exists ($measurement, 'homogeneity_white'))?$measurement->homogeneity_white:0;
            $dataset['homogeneity_black'] = ($measurement != NULL && property_exists ($measurement, 'homogeneity_black'))?$measurement->homogeneity_black:0;
            $dataset['gamma'] = ($measurement != NULL && property_exists ($measurement, 'gamma'))?$measurement->gamma:0;
            $dataset['ambient_temp'] = ($measurement != NULL && property_exists ($measurement, 'ambient_temp'))?$measurement->ambient_temp:0;
            $table[] = $dataset;

            echo '<td>'.$dataset['luminance_white'].'</td>';
            echo '<td>'.$dataset['luminance_black'].'</td>';
            echo '<td>'.$dataset['chromatisity_white_x'].'</td>';
            echo '<td>'.$dataset['chromatisity_white_y'].'</td>';
            echo '<td>'.$dataset['wavelength_red'].'</td>';
            echo '<td>'.$dataset['saturation_red'].'</td>';
            echo '<td>'.$dataset['wavelength_green'].'</td>';
            echo '<td>'.$dataset['saturation_green'].'</td>';
            echo '<td>'.$dataset['wavelength_blue'].'</td>';
            echo '<td>'.$dataset['saturation_blue'].'</td>';
            echo '<td>'.$dataset['contrast_white_black'].'</td>';
            echo '<td>'.$dataset['homogeneity_white'].'</td>';
            echo '<td>'.$dataset['homogeneity_black'].'</td>';
            echo '<td>'.$dataset['gamma'].'</td>';
            echo '<td>'.$dataset['ambient_temp'].'</td>';


            echo "</tr>";
        }

    }


    public function showLaser($id)
    {

        $data = DB::connection('pgsql_pc')->select('select distinct on (products.st_serial_nr) products.st_serial_nr, products.lifecycle, products.created_at as products_created_at, device_records."data", device_records.state, device_records.note, device_records.production_section_template_id , device_records.created_at as device_records_created_at
        FROM products
        left JOIN device_records
        ON products.id = device_records.products_id
        where products.st_article_nr = \''.$id.'\'
        order by products.st_serial_nr,device_records.created_at desc;
        ');

        $cols = array('nr', 'serial', 'serial_device', 'product_creation', 'test_date', 'state', 'note',
        'laser_1',
        'laser_2',
        'laser_3',
        'laser_4',
        'laser_5',
        'laser_6',
        'laser_7',
        'laser_8'
    );

        // heading
        echo '<tr>';
        foreach($cols as $key=>$value){
            echo '<th>'.$value.'</th>';
        }
        echo '</tr>';


        $table = array();
        $count=1;
        foreach( $data as $product_entry){
            echo "<tr>";
            /*
              [0] => stdClass Object
        (
            [st_serial_nr] => 000001
            [lifecycle] => 0
            [products_created_at] => 2020-10-19 14:30:05.525
            [data] =>
            [state] =>
            [note] =>
            [production_section_template_id] =>
            [device_records_created_at] =>
        )
            */
            $dataset['nr'] = $count++;
            $dataset['serial'] = '';
            $dataset['serial_device'] = $product_entry->st_serial_nr;
            $dataset['product_creation'] = $product_entry->products_created_at;
            $dataset['test_date'] = $product_entry->device_records_created_at;
            $dataset['state'] = $product_entry->state;
            $dataset['note'] = $product_entry->note;

            echo '<td>'.$dataset['nr'].'</td>';
            echo '<td>'.$dataset['serial'].'</td>';
            echo '<td>'.$dataset['serial_device'].'</td>';
            echo '<td>'.$dataset['product_creation'].'</td>';
            echo '<td>'.$dataset['test_date'].'</td>';
            echo '<td>'.$dataset['state'].'</td>';
            echo '<td>'.$dataset['note'].'</td>';

/*
{
  [laser.1] => 18.596
    [laser.2] => 18.619
    [laser.3] => 18.761
    [laser.4] => 18.619
    [laser.5] => 18.758
    [laser.6] => 18.47
    [laser.7] => 18.522
    [laser.8] => 18.593}
*/

            $measurement = \json_decode($product_entry->data, TRUE);
/*
            echo '<pre>';
            print_r($measurement);
            echo '</pre>';
*/
            $dataset['laser_1'] = ($measurement != NULL && array_key_exists  ('laser.1', $measurement))?$measurement['laser.1']:0;
            $dataset['laser_2'] = ($measurement != NULL && array_key_exists  ('laser.2', $measurement))?$measurement['laser.2']:0;
            $dataset['laser_3'] = ($measurement != NULL && array_key_exists  ('laser.3', $measurement))?$measurement['laser.3']:0;
            $dataset['laser_4'] = ($measurement != NULL && array_key_exists  ('laser.4', $measurement))?$measurement['laser.4']:0;
            $dataset['laser_5'] = ($measurement != NULL && array_key_exists  ('laser.5', $measurement))?$measurement['laser.5']:0;
            $dataset['laser_6'] = ($measurement != NULL && array_key_exists  ('laser.6', $measurement))?$measurement['laser.6']:0;
            $dataset['laser_7'] = ($measurement != NULL && array_key_exists  ('laser.7', $measurement))?$measurement['laser.7']:0;
            $dataset['laser_8'] = ($measurement != NULL && array_key_exists  ('laser.8', $measurement))?$measurement['laser.8']:0;
            $table[] = $dataset;

            echo '<td>'.$dataset['laser_1'].'</td>';
            echo '<td>'.$dataset['laser_2'].'</td>';
            echo '<td>'.$dataset['laser_3'].'</td>';
            echo '<td>'.$dataset['laser_4'].'</td>';
            echo '<td>'.$dataset['laser_5'].'</td>';
            echo '<td>'.$dataset['laser_6'].'</td>';
            echo '<td>'.$dataset['laser_7'].'</td>';
            echo '<td>'.$dataset['laser_8'].'</td>';
            echo "</tr>";
        }

    }


    public function showProduction()
    {


        $data = DB::connection('pgsql_pc')->select('select  products.st_serial_nr, products.st_article_nr, products.lifecycle, products.created_at as products_created_at, device_records."data", device_records.state, device_records.note, device_records.production_section_template_id , device_records.created_at as device_records_created_at
        FROM products
        right JOIN device_records
        ON products.id = device_records.products_id
        order by device_records.created_at desc
        limit 200;
        ');

        $cols = array('test_date', 'serial', 'serial_device', 'article_nr', 'product_creation', 'state', 'note','test_data');

        // heading
        echo '<tr>';
        foreach($cols as $key=>$value){
            echo '<th>'.$value.'</th>';
        }
        echo '</tr>';


        $table = array();
        foreach( $data as $product_entry){
            echo "<tr>";
            /*
              [0] => stdClass Object
        (
            [st_serial_nr] => 000001
            [lifecycle] => 0
            [products_created_at] => 2020-10-19 14:30:05.525
            [data] =>
            [state] =>
            [note] =>
            [production_section_template_id] =>
            [device_records_created_at] =>
        )
            */
            $dataset['test_date'] = $product_entry->device_records_created_at;
            $dataset['serial'] = '';
            $dataset['serial_device'] = $product_entry->st_serial_nr;
            $dataset['article_nr'] = $product_entry->st_article_nr;
            $dataset['product_creation'] = $product_entry->products_created_at;

            $dataset['state'] = $product_entry->state;
            $dataset['note'] = $product_entry->note;
            $dataset['data'] = $product_entry->data;

            echo '<td>'.$dataset['test_date'].'</td>';
            echo '<td>'.$dataset['serial'].'</td>';
            echo '<td>'.$dataset['serial_device'].'</td>';
            echo '<td>'.$dataset['article_nr'].'</td>';
            echo '<td>'.$dataset['product_creation'].'</td>';
            echo '<td>'.$dataset['state'].'</td>';
            echo '<td>'.$dataset['note'].'</td>';
            echo '<td>'.$dataset['data'].'</td>';

            echo "</tr>";

        }
    }


    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {

        echo '<html>
        <head>';
        if( $id == 'production'){
            echo '<meta http-equiv="refresh" content="30" />';
        }

        echo '<style>
        table {
            width:100%;
          }
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
        #t01 tr:nth-child(even) {
            background-color: #eee;
          }
          #t01 tr:nth-child(odd) {
            background-color: #fff;
          }
          #t01 th {
            color: white;
            background-color: black;
          }</style>';

        echo '</head>
        <body>';

        echo '<table class="table table-striped" id="t01">';


        if($id == '800000114B2'){
            $this->showLaser($id);
        }else
        if($id == '80000101A1'
        || $id == '80000081C1'){
            $this->showDaisy($id);
        }else
        if( $id == 'production'){
            $this->showProduction();
        }


        echo '</body>';
        return;

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
