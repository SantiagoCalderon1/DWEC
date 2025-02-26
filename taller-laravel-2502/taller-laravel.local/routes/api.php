<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/marcas', [App\Http\Controllers\ApiController::class, 'obtengomarcas']);
Route::get('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'obtengomarca']);
Route::post('/marcas', [App\Http\Controllers\ApiController::class, 'nuevamarca']);
Route::put('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'modificamarca']);
Route::delete('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'borramarca']);
/*
Route::post("login", [App\Http\Controllers\ApiController::class, "login"]);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/marcas', [App\Http\Controllers\ApiController::class, 'obtengomarcas']);
    Route::get('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'obtengomarca']);
    Route::post('/marcas', [App\Http\Controllers\ApiController::class, 'nuevamarca']);
    Route::put('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'modificamarca']);
    Route::delete('/marcas/{id}', [App\Http\Controllers\ApiController::class, 'borramarca']);
    Route::post("logout", [SanctumAuthController::class, "logout"]);
});
*/
