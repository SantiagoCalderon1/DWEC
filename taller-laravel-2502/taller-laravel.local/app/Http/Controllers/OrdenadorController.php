<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Validator;
use App\Models\Ordenador;
use App\Models\Marca;
use App\Models\Ubicacion;
USE Session;

class OrdenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $items = collect(DB::select('SELECT ordenadors.id, ordenadors.numero, marcas.nombre as marca, ordenadors.modelo, ubicacions.nombre as ubicacion FROM ordenadors,marcas,ubicacions where idmarca=marcas.id and idubicacion=ubicacions.id;'));
            return \Yajra\DataTables\DataTables::of($items)->addColumn('action', function ($items) {
                $result = "";
                $result .= '<a href="ordenadors/' . $items->id . '" class="btn btn-sm btn-primary me-1"><i class="fa fa-eye"></i> Ver</a>';
                $result .= '<a href="ordenadors/' . $items->id . '/edit" class="btn btn-sm btn-warning me-2"><i class="fa fa-edit"></i> Modif.</a>';
                $result .= '<a href="ordenadors/showdelete/' . $items->id . '" id="' . $items->id . '" class="btn btn-sm btn-danger"><i class="fa fa-times"></i> Borrar</a>';
                return $result;
            })->make(true);
        }else{
            $ordenadors = DB::table('ordenadors')
                ->join('marcas', 'ordenadors.idmarca', '=', 'marcas.id')
                ->join('ubicacions', 'ordenadors.idubicacion', '=', 'ubicacions.id')
                ->select( 'ordenadors.id', 'ordenadors.numero', 'marcas.nombre as marca', 'ordenadors.modelo', 'ubicacions.nombre as ubicacion')
                ->simplePaginate(15);
            return view('ordenador.lista', ['ordenadors' => $ordenadors]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $marcas = DB::select('select id,nombre from marcas order by nombre;');
        $ubicaciones = DB::select('select id,nombre from ubicacions order by nombre;');
        return View('ordenador.create', compact( 'marcas' , 'ubicaciones'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'numero' => 'max:20',
            'idmarca' => 'required',
            'modelo' => 'required|max:20',
            'idubicacion' => 'required',
            'tppc' => 'max:20',
            'numserie' => 'max:25',
        ], [
            'numero.max' => 'El número no puede tener más de 20 caracteres.',
            'idmarca.required' => 'Introduce la marca por favor.',
            'modelo.required' => 'Introduce el modelo por favor.',
            'modelo.max' => 'El modelo no puede tener más de 20 caracteres.',
            'idubicacion.required' => 'Introduce la ubicación por favor.',
            'tppc.max' => 'El tipo de pc no puede tener más de 20 caracteres.',
            'numserie.max' => 'El número de serie no puede tener más de 25 caracteres.',
        ]);

        if ($validator->fails()) {
            return redirect('ordenadors/create')
                ->withErrors($validator)
                ->withInput();
        }
        Ordenador::create($request->all());
        Session::flash('success', 'Ordenador insertado');
        return redirect()->route('ordenadors.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tipo = 'show';
        $ordenador = Ordenador::findOrFail($id);
        $marca = Marca::findOrFail( $ordenador->idmarca)->nombre;
        $ubicacion = Ubicacion::findOrFail($ordenador->idubicacion)->nombre;
        return View('ordenador.show', compact('ordenador', 'tipo', 'marca', 'ubicacion'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $ordenador = Ordenador::findOrFail($id);
        $marcas = DB::select('select id,nombre from marcas order by nombre;');
        $ubicaciones = DB::select('select id,nombre from ubicacions order by nombre;');
        return View( 'ordenador.edit', compact('marcas', 'ubicaciones', 'ordenador'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'numero' => 'max:20',
            'idmarca' => 'required',
            'modelo' => 'required|max:20',
            'idubicacion' => 'required',
            'tppc' => 'max:20',
            'numserie' => 'max:25',
        ], [
            'numero.max' => 'El número no puede tener más de 20 caracteres.',
            'idmarca.required' => 'Introduce la marca por favor.',
            'modelo.required' => 'Introduce el modelo por favor.',
            'modelo.max' => 'El modelo no puede tener más de 20 caracteres.',
            'idubicacion.required' => 'Introduce la ubicación por favor.',
            'tppc.max' => 'El tipo de pc no puede tener más de 20 caracteres.',
            'numserie.max' => 'El número de serie no puede tener más de 25 caracteres.',
        ]);

        if ($validator->fails()) {
            return redirect()->route('ordenadors.edit', $ordenador->id)->withErrors($validator)->withInput();
        }
        $input = $request->all();
        $ordenador = Ordenador::findOrFail($id);
        $ordenador->fill($input)->save();
        Session::flash('success', 'Ordenador "' . $ordenador->id . '" actualizado');
        return redirect()->route('ordenadors.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ordenador = Ordenador::findOrFail($id);
        $ordenador->delete();
        Session::flash('success', 'Ordenador "' . $ordenador->id . '" eliminado');
        return redirect()->route('ordenadors.index');
    }

    public function showdelete(string $id)
    {
        $tipo = 'delete';
        $ordenador=Ordenador::findOrFail($id);
        $marca = Marca::findOrFail($ordenador->idmarca)->nombre;
        $ubicacion = Ubicacion::findOrFail($ordenador->idubicacion)->nombre;
        return View('ordenador.show', compact('ordenador', 'tipo', 'marca', 'ubicacion'));
    }

    public function dimemarcaubic(Request $request)
    {
        if ($request->ajax() && isset($_GET['valor'])){
            $idpc = $_GET['valor'];
            $pc = DB::selectOne('SELECT marcas.nombre as marca, ubicacions.nombre as ubicacion from ordenadors,marcas,ubicacions where ordenadors.id=? and ordenadors.idmarca=marcas.id and ordenadors.idubicacion=ubicacions.id;',[$request->valor]);
            if (!$pc){
                $marca = '';
                $ubicacion = '';
            }else{
                $marca = $pc->marca;
                $ubicacion = $pc->ubicacion;
            }
            return response()->json(['resultado'=>'bien','msjmarca'=>$marca,'msjubicacion'=>$ubicacion]);
        }else{
            Session::flash('warning','Operación no permitida');
            return redirect()->to('login');
        }
    }
}
