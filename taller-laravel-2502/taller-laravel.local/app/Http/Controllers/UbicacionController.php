<?php

namespace App\Http\Controllers;

use App\Models\Ubicacion;
use Illuminate\Http\Request;
use DB;
use Validator;
use Session;

class UbicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $items = collect(DB::select('SELECT id, nombre as ubicacion FROM ubicacions;'));
            return \Yajra\DataTables\DataTables::of($items)->addColumn('action', function ($items) {
                $result = "";
                $result .= '<a href="ubicacions/' . $items->id . '/edit" class="btn btn-sm btn-warning me-2"><i class="fa fa-edit"></i> Modif.</a>';
                $result .= '<a href="ubicacions/' . $items->id . '" class="btn btn-sm btn-danger"><i class="fa fa-times"> </i> Borrar</a>';
                return $result;
            })->make(true);
        }else{
            $ubicacions = Ubicacion::simplePaginate(15);
            return view('ubicacion.lista', ['ubicacions' => $ubicacions]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return View('ubicacion.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:50|unique:ubicacions',
        ], ['nombre.unique' => 'No se ha grabado porque la ubicacion introducida ya la has usado antes. Introduce otra por favor.',
            'nombre.required' => 'Introduce la ubicacion por favor.']);

        if ($validator->fails()) {
            return redirect('ubicacions/create')
                ->withErrors($validator)
                ->withInput();
        }
        DB::table('ubicacions')->insert($request->except(['_token','grabar']));
        Session::flash('success', 'La ubicación se ha creado satisfactoriamente');
        return redirect()->route('ubicacions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ubicacion $ubicacion)
    {
        return View('ubicacion.show', compact('ubicacion'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ubicacion $ubicacion)
    {
        return View('ubicacion.edit',['ubicacion' => $ubicacion]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ubicacion $ubicacion)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:50|unique:ubicacions',
        ], [
            'nombre.unique' => 'No se ha grabado porque la ubicación introducida ya la has usado antes. Introduce otra por favor.',
            'nombre.required' => 'Introduce la ubicación por favor.'
        ]);

        if ($validator->fails()) {
            return redirect()->route('ubicacions.edit', $ubicacion->id)->withErrors($validator)->withInput();
            // equivalente redirect('marcas/'. $marca->id.'/edit')->withErrors($validator)->withInput();
        }
        // $input = $request->all();
        $input = $request->except('_token');
        $ubicacion->fill($input)->save();
        Session::flash('success', 'Ubicación "' . $ubicacion->id . '" actualizada');
        return redirect()->route('ubicacions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ubicacion $ubicacion)
    {
        $ubicacion->delete();
        Session::flash('success', 'Ubicación "' . $ubicacion->nombre . '" eliminada');
        return redirect()->route('ubicacions.index');
    }

    public function listaActivos(Request $request)
    {
        $teclados = DB::table('teclados')
            ->join('marcas', 'teclados.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'teclados.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'TECLADO' as activo"), 'teclados.id', 'teclados.numero', 'marcas.nombre as marca', 'teclados.modelo', 'ubicacions.nombre as ubicacion');
        $componentes = DB::table('componentes')
            ->join('marcas', 'componentes.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'componentes.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'COMPONENTE' as activo"), 'componentes.id', 'componentes.numero', 'marcas.nombre as marca', 'componentes.modelo', 'ubicacions.nombre as ubicacion');
        $dispreds = DB::table('dispreds')
            ->join('marcas', 'dispreds.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'dispreds.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'DISP_RED' as activo"), 'dispreds.id', 'dispreds.numero', 'marcas.nombre as marca', 'dispreds.modelo', 'ubicacions.nombre as ubicacion');
        $impresoras = DB::table('impresoras')
            ->join('marcas', 'impresoras.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'impresoras.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'IMPRESORA' as activo"), 'impresoras.id', 'impresoras.numero', 'marcas.nombre as marca', 'impresoras.modelo', 'ubicacions.nombre as ubicacion');
        $monitors = DB::table('monitors')
            ->join('marcas', 'monitors.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'monitors.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'MONITOR' as activo"), 'monitors.id', 'monitors.numero', 'marcas.nombre as marca', 'monitors.modelo', 'ubicacions.nombre as ubicacion');
        $ordenadors = DB::table('ordenadors')
            ->join('marcas', 'ordenadors.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'ordenadors.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'ORDENADOR' as activo"), 'ordenadors.id', 'ordenadors.numero', 'marcas.nombre as marca', 'ordenadors.modelo', 'ubicacions.nombre as ubicacion');
        $activos = DB::table('ratons')
            ->join('marcas', 'ratons.idmarca', '=', 'marcas.id')
            ->join('ubicacions', 'ratons.idubicacion', '=', 'ubicacions.id')
            ->select(DB::raw("'RATON' as activo"), 'ratons.id', 'ratons.numero', 'marcas.nombre as marca', 'ratons.modelo', 'ubicacions.nombre as ubicacion')
            ->union( $teclados)
            ->union( $componentes)
            ->union( $dispreds)
            ->union( $impresoras)
            ->union( $monitors)
            ->union( $ordenadors)
            ->orderBy('ubicacion','asc')
            ->orderBy('activo', 'asc')
            ->simplePaginate(15);
        $ubicaciones = DB::select('select id,nombre from ubicacions order by nombre;');
        return view('ubicacion.listaactivos', compact('activos','ubicaciones'));
    }

    public function cambiaubicacion(Request $request)
    {
        if ($request->ajax() && isset($_GET[ 'id']) && isset($_GET[ 'activo']) && isset($_GET[ 'ubicacion'])) {
            $todobien = true;
            switch ( $_GET['activo']) {
                case 'COMPONENTE':
                    $todobien = $items = DB::update( 'UPDATE componentes set idubicacion=? where id=?;',[ $_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'DISP_RED':
                    $todobien = $items = DB::update( 'UPDATE dispreds set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'IMPRESORA':
                    $todobien = $items = DB::update( 'UPDATE impresoras set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'MONITOR':
                    $todobien = $items = DB::update( 'UPDATE monitors set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'ORDENADOR':
                    $todobien = $items = DB::update( 'UPDATE ordenadors set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'RATON':
                    $todobien = $items = DB::update( 'UPDATE ratons set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                case 'TECLADO':
                    $todobien = $items = DB::update( 'UPDATE teclados set idubicacion=? where id=?;', [$_GET['ubicacion'], $_GET['id']]);
                    break;
                default:
                    $todobien = false;
                    break;
            }
            if ($todobien){
                return response()->json(['resultado' => 'bien', 'msjrespuesta' => "Cambiada la ubicación correctamente"]);
            }else{
                return response()->json(['resultado' => 'mal', 'msjrespuesta' => "No se ha podido realizar el cambio de ubicación"]);
            }
        }else{
            return response()->json(['resultado' => 'mal', 'msjrespuesta' => "No se ha podido realizar el cambio de ubicación"]);
        }
    }
}
