<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;
use Validator;
use DB;
use DataTables;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $items = collect(DB::select('SELECT id, nombre as marca FROM marcas;'));
            return \Yajra\DataTables\DataTables::of($items)->addColumn('action', function ($items) {
                $result = "";
                $result .= '<a href="marcas/' . $items->id . '/edit" class="btn btn-sm btn-warning me-2"><i class="fa fa-edit"></i> Modif.</a>';
                $result .= '<a href="marcas/' . $items->id . '" class="btn btn-sm btn-danger"><i class="fa fa-times"> </i> Borrar</a>';
                return $result;
            })->make(true);
        }else{
            $marcas = Marca::simplePaginate(15);
            return view('marca.lista', ['marcas' => $marcas]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return View('marca.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO guardamos la marca...
        //Session::flash('errors', collect(['Mensaje de error-1','Mensaje de error-2','Mensaje de error-3']));
        //Session::flash('success', 'La marca se ha creado satisfactoriamente');
        //Session::flash('info', 'Información acerca de la creación de la marca');
        //Session::flash('warning', 'Advertencia acerca de la creación de la marca');
        //Session::flash('danger', 'ERROR acerca de la creación de la marca');
        //Session::flash('mensaje', 'Mensaje de error');
        $validator = Validator::make($request->all(),
        ['nombre' => 'required|max:50|unique:marcas',],
        ['nombre.unique' => 'No se ha grabado porque la marca introducida ya la has usado antes. Introduce otra por favor.', 'nombre.required' => 'Introduce la marca por favor.']);
        if ($validator->fails()) {
            Session::flash('danger', 'ERROR la marca no se ha podido crear.');
           return redirect('marcas/create')->withErrors($validator)->withInput();
        }
        DB::insert('insert into marcas(nombre) values (?);', [$request->nombre]);
        Session::flash('success', 'La marca se ha creado satisfactoriamente');
        return redirect()->route('marcas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Marca $marca)
    {
        return View('marca.show', compact('marca'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marca $marca)
    {
        return View('marca.edit',['marca' => $marca]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marca $marca)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:50|unique:marcas',
        ], [
            'nombre.unique' => 'No se ha grabado porque la marca introducida ya la has usado antes. Introduce otra por favor.',
            'nombre.required' => 'Introduce la marca por favor.'
        ]);
        if ($validator->fails()) {
            return redirect()->route('marcas.edit', $marca->id)->withErrors($validator)->withInput();
            // equivalente redirect('marcas/'. $marca->id.'/edit')->withErrors($validator)->withInput();
        }
        DB::update('update marcas set nombre = ? where id = ?;', [$request->nombre, $marca->id]);
        Session::flash('success', 'Marca "' . $marca->id . '" actualizada');
        return redirect()->route('marcas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marca $marca)
    {
        DB::delete('delete from marcas where id = ?;',[$marca->id]);
        Session::flash('success', 'Marca "' . $marca->nombre . '" eliminada');
        return redirect()->route('marcas.index');
    }
}
