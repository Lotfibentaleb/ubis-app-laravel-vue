<?php
use App\Http\Controllers\CleanupController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});
*/
Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

/*
 * Clients management
 * */
Route::prefix('/clients')->group(function () {
    Route::get('', 'ClientsController@index');
    Route::get('{client}', 'ClientsController@show');
    Route::post('store', 'ClientsController@store');
    Route::patch('{client}', 'ClientsController@update');
    Route::post('destroy', 'ClientsController@destroyMass');
    Route::delete('{client}/destroy', 'ClientsController@destroy');
});

/*
 * Current user
 * */
Route::prefix('/user')->group(function () {
    Route::get('', 'CurrentUserController@show');
    Route::patch('', 'CurrentUserController@update');
    Route::patch('/password', 'CurrentUserController@updatePassword');
});

/*
 * File upload (e.g. avatar)
 * */
Route::post('/files/store', 'FilesController@store');

Route::get('/test/{id}', test::class);

/*
 * Device registration management
 * */

Route::prefix('/registration')->group(function () {
    Route::get('', 'RegistrationController@index');
    Route::get('/articles', 'RegistrationController@articles');         // list several articles by name/art.nr.
    Route::get('/articles/{id}', 'RegistrationController@article');     // get back details per article
    Route::get('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@showProduct');   // get back details per product
    Route::post('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@createProduct');  // get back details per article
    Route::delete('/product/{id}/components/{componentId}', 'RegistrationController@deleteComponent');

});

Route::prefix('/productsearch')->group(function () {
    Route::get('', 'ProductSearchController@index');
    Route::get('/articles', 'RegistrationController@articles');         // list several articles by name/art.nr.
    Route::get('/articles/{id}', 'RegistrationController@article');     // get back details per article
    Route::get('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@showProduct');   // get back details per product
    Route::post('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@createProduct');  // get back details per article
    Route::delete('/product/{id}/components/{componentId}', 'RegistrationController@deleteComponent');

});

Route::prefix('/productlist')->group(function () {
    Route::get('', 'ProductsListController@index');
/*    Route::get('/articles', 'RegistrationController@articles');         // list several articles by name/art.nr.
    Route::get('/articles/{id}', 'RegistrationController@article');     // get back details per article
    Route::get('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@showProduct');   // get back details per product
    Route::post('/product/{id}/articleNr/{articleNr?}', 'RegistrationController@createProduct');  // get back details per article
*/
    Route::delete('/product/{id}', 'ProductsListController@destroy');

});


Route::get('/cleanup', [App\Http\Controllers\CleanupController::class, 'index']);
