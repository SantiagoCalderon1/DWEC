<?php

namespace App\Http\Controllers;

use App\Models\Soft_pc;
use Illuminate\Http\Request;
use DB;
use Validator;
use Session;
use App\Models\Ordenador;
use App\Models\Software;
use App\Models\Marca;
use App\Models\Ubicacion;

class Soft_pcController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $soft_pcs = DB::table('soft_pcs')
            ->join('ordenadors', 'soft_pcs.idpc', '=', 'ordenadors.id')
            ->join('softwares', 'soft_pcs.idsoft', '=', 'softwares.id')
            ->join('marcas', 'ordenadors.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'ordenadors.idubicacion', '=', 'ubicacions.id')
            ->select( 'soft_pcs.id', 'ordenadors.numero as numpc', 'marcas.nombre as marca','ubicacions.nombre as ubicacion', 'softwares.descripcion', 'softwares.tpsoft', 'soft_pcs.fechainst')
            ->orderBy( 'ubicacion', 'asc')
            ->orderBy( 'numpc', 'asc')
            ->simplePaginate(15);
        return view( 'soft_pc.lista', [ 'soft_pcs' => $soft_pcs]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ordenadores = DB::select('select id,numero from ordenadors order by numero;');
        $softwares = DB::select('select id,descripcion from softwares order by descripcion;');
        return View( 'soft_pc.create', compact( 'ordenadores', 'softwares'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idpc' => 'required',
            'idsoft' => 'required',
            'fechainst' => 'date',
        ], [
            'idmarca.required' => 'Introduce el PC por favor.',
            'idsoft.required' => 'Introduce el software por favor.',
            'fechainst.date' => 'Introduce una fecha válida.',
        ]);

        if ($validator->fails()) {
            return redirect( 'soft_pcs/create')
                ->withErrors($validator)
                ->withInput();
        }
        Soft_pc::create($request->all());
        Session::flash('success', 'Instalación insertada');
        return redirect()->route( 'soft_pcs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Soft_pc $soft_pc)
    {
        $tipo = 'delete';
        $ordenador = Ordenador::findOrFail( $soft_pc->idpc);
        $software = Software::findOrFail( $soft_pc->idsoft);
        $marca = Marca::findOrFail( $ordenador->idmarca)->nombre;
        $ubicacion = Ubicacion::findOrFail($ordenador->idubicacion)->nombre;
        $licencia = $software->licencia;
        $ordenador = $ordenador->numero;
        $software = $software->descripcion;
        return View( 'soft_pc.show', compact( 'soft_pc', 'tipo', 'ordenador', 'software','marca','ubicacion','licencia'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Soft_pc $soft_pc)
    {
        $ordenadores = DB::select('select id,numero from ordenadors order by numero;');
        $softwares = DB::select('select id,descripcion from softwares order by descripcion;');
        return View( 'soft_pc.edit', compact( 'ordenadores', 'softwares', 'soft_pc'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Soft_pc $soft_pc)
    {
        $validator = Validator::make($request->all(), [
            'idpc' => 'required',
            'idsoft' => 'required',
            'fechainst' => 'date',
        ], [
            'idmarca.required' => 'Introduce el PC por favor.',
            'idsoft.required' => 'Introduce el software por favor.',
            'fechainst.date' => 'Introduce una fecha válida.',
        ]);

        if ($validator->fails()) {
            return redirect()->route( 'soft_pcs.edit', $soft_pc->id)->withErrors($validator)->withInput();
        }
        $input = $request->all();
        $soft_pc->fill($input)->save();
        Session::flash('success', 'Asignación "' . $soft_pc->id . '" actualizada');
        return redirect()->route( 'soft_pcs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Soft_pc $soft_pc)
    {
        $soft_pc->delete();
        Session::flash('success', 'Asignación "' . $soft_pc->id . '" eliminada');
        return redirect()->route( 'soft_pcs.index');
    }

    public function showchubicacion()
    {
        $ubicaciones = DB::select('select id,nombre from ubicacions order by nombre;');
        $softwares = DB::select('select id,descripcion from softwares order by descripcion;');
        return View( 'soft_pc.chubicacion', compact( 'ubicaciones', 'softwares'));

    }

    public function storeubic(Request $request)
    {
        $ordenadores = Ordenador::where('idubicacion', $request->idubicacion)->get('id');
        $conta = 0;
        foreach ( $ordenadores as $idordenador) {
            $asociacion = Soft_pc::updateOrCreate(
                ['idpc' => $idordenador->id, 'idsoft' => $request->idsoft],
                [ 'fechainst' => $request->fechainst]
            );
            $conta++;
        }

        Session::flash('success', 'Insertadas/actualizadas '. $conta. 'asociaciones PC/Sw');
        return redirect()->route('soft_pcs.index');
    }
}
