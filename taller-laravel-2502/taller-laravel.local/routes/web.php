<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\OrdenadorController;
use App\Http\Controllers\SoftwareController;
use App\Http\Controllers\Soft_pcController;

Auth::routes();
Route::middleware(['auth'])->group(function () {
    Route::redirect('/', '/home');
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/dimelicencia', 'App\Http\Controllers\SoftwareController@dimelicencia');
    Route::get('/dimemarcaubic', 'App\Http\Controllers\OrdenadorController@dimemarcaubic');
    Route::get('soft_pcs/showchubicacion', 'App\Http\Controllers\Soft_pcController@showchubicacion')->name('muestraChUbicSoft_pc');
    Route::get( 'ubicacions/activos', 'App\Http\Controllers\UbicacionController@listaActivos')->name('listaactivos');
    Route::resources([
        'marcas' => MarcaController::class,
        'ubicacions' => UbicacionController::class,
        'ordenadors' => OrdenadorController::class,
        'softwares' => SoftwareController::class,
        'soft_pcs' => Soft_pcController::class,
    ]);
    Route::get( 'ordenadors/showdelete/{id}', 'App\Http\Controllers\OrdenadorController@showdelete')->name('muestraBorradoOrdenador');
    Route::get( 'softwares/showdelete/{id}', 'App\Http\Controllers\SoftwareController@showdelete')->name('muestraBorradoSoftware');
    Route::post( 'soft_pcs/storeubicsoft', 'App\Http\Controllers\Soft_pcController@storeubic')->name( 'storeubicsoft');
    Route::get( '/cambiaubicacion', 'App\Http\Controllers\UbicacionController@cambiaubicacion');
});

