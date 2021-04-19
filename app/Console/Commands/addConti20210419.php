<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use GuzzleHttp;
use Validator;


class addConti20210419 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'service:addConti20210419';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manual add conti devices in prodcution, but not registered yet';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function createProduct($articleNr, $productionOrderNr, $serialNr)
    {
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $options = [
            'http_errors'=> false,
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $postData = array('st_article_nr' => $articleNr, 'st_serial_nr' => $serialNr);

        $product = null;
        // no product ID given -> create product
        $requestString = 'products';
        $response = $client->request('POST', $baseUrl.$requestString, array_merge($options, ['json' => $postData]));
        $statusCode = $response->getStatusCode();
        if( $statusCode != 201){
            $statusMessage = 'Could not create product.';
            if( $response &&  !empty($response->getBody()) && !empty((string)$response->getBody())){
                    $responseContent = json_decode((string)$response->getBody(), true);
                    $statusMessage = (array_key_exists('error', $responseContent))?$responseContent['error']:$statusMessage;
                    $statusMessage = (array_key_exists('message', $responseContent))?$responseContent['message']:$statusMessage;
            }
            echo 'Product with serial '.$serialNr.' could not be created ('.$statusMessage.')'."\r\n";
            return -1;
        }

        $product = json_decode((string)$response->getBody());
        $product = $product->data;
        echo 'Product with serial '.$serialNr.' and ID '.$product->id.' created successfully.'."\r\n";
        return 0;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $client = new GuzzleHttp\Client();
        $baseUrl = env('PIS_SERVICE_BASE_URL2');
        $options = [
            'http_errors'=> false,
            'headers' =>[
            'Authorization' => 'Bearer ' .env('PIS_BEARER_TOKEN'),
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
            ]
        ];

        $productionOrderNr = "2021-1446";
        $articleNr = "80000114B2";

        $serialStart = '26352';
        $serialNr = $serialStart;
        do{
            $this->createProduct($articleNr, $productionOrderNr, (string)$serialNr);
            $serialNr++;
        }while($serialNr <= '26501');

        $serialStart = '26627';
        $serialNr = $serialStart;
        do{
            $this->createProduct($articleNr, $productionOrderNr, (string)$serialNr);
            $serialNr++;
        }while($serialNr <= '26776');


        return 0;
    }
}
