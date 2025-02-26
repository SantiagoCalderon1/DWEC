<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    public function obtengomarcas()
    {
        try {
            $marcas = collect(DB::select('select * from marcas;'));
            return response()->json([
                'status' => 'SUCCESS',
                'message' => 'Operación exitosa',
                'data' => $marcas
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'ERROR',
                'message' => 'No se han podido obtener las marcas!',
                'data' => []
            ], 500);
        }
    }
    public function obtengomarca($id)
    {
            try {
                $marca = DB::select('select * from marcas where id=? ;', [$id]);
                return response()->json([
                    'status' => 'SUCCESS',
                    'message' => 'Operación exitosa',
                    'data' => $marca
                ]);
            } catch (Exception $exception) {
                $message = $exception->getMessage();
                return response()->json([
                    'status' => 'ERROR',
                    'message' => $message,
                    'data' => []
                ]);
            }
    }
    public function nuevamarca(Request $request)
    {
        try {
            $marca = DB::insert('insert into marcas(nombre) values (?);', [$request->nombre]);
            return response()->json([
                'status' => 'SUCCESS',
                'message' => 'Operación exitosa',
                'data' => $marca
            ]);
        } catch (Exception $exception) {
            $message = "No se ha podido crear la marca!";
            return response()->json([
                'status' => 'ERROR',
                'message' => $message,
                'data' => []
            ]);
        }

    }
    public function modificamarca(Request $request, $id)
    {
            try {
                $marca = DB::update('update marcas set nombre=? where id=? ;', [$request->nombre, $id]);
                return response()->json([
                    'status' => 'SUCCESS',
                    'message' => 'Operación exitosa',
                    'data' => $marca
                ]);
            } catch (Exception $exception) {
                $message = "La marca con ID: $id no se ha podido actualizar";
                return response()->json([
                    'status' => 'ERROR',
                    'message' => $message,
                    'data' => []
                ]);
            }
    }
    public function borramarca($id)
    {
            try {
                $marca = DB::delete('delete from marcas where id=? ;', [$id]);
                return response()->json([
                    'status' => 'SUCCESS',
                    'message' => 'Operación exitosa',
                    'data' => $marca
                ]);
            } catch (Exception $exception) {
                $message = $exception->getMessage();
                return response()->json([
                    'status' => 'ERROR',
                    'message' => $message,
                    'data' => []
                ]);
            }
    }

    public function login (Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $user = User::where("email", "=", $request->email)->first();
        if (isset($user)){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json(["mensaje" => "Sesión iniciada", "acess_token" => $token], 200);
            }else{
                return response()->json(["mensaje" => "Contraseña incorrecta", "error" => true], 200);
            }
        }else{
            return response()->json(["mensaje" => "El usuario no existe", "error" => true], 200);
        }
    }
}
