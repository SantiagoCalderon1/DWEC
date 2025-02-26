<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use App\Models\Software;
use DB;
use Illuminate\Http\Request;
use Session;
use Validator;

class SoftwareController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $softwares = DB::table('softwares')
            ->join('marcas', 'softwares.idmarca', '=', 'marcas.id')
            ->select( 'softwares.id', 'softwares.descripcion', 'marcas.nombre as marca', 'softwares.modelo', 'softwares.licencia')
            ->simplePaginate(15);
        return view('software.lista', ['softwares' => $softwares]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $marcas = DB::select('select id,nombre from marcas order by nombre;');
        return View('software.create', compact( 'marcas'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'descripcion' => 'max:80',
            'idmarca' => 'required',
            'modelo' => 'required|max:20',
            'tpsoft' => 'max:20',
            'numserie' => 'max:25',
        ], [
            'descripcion.max' => 'La descripción no puede tener más de 80 caracteres.',
            'idmarca.required' => 'Introduce la marca por favor.',
            'modelo.required' => 'Introduce el modelo por favor.',
            'modelo.max' => 'El modelo no puede tener más de 20 caracteres.',
            'tpsoft.max' => 'El tipo de software no puede tener más de 20 caracteres.',
            'numserie.max' => 'El número de serie no puede tener más de 25 caracteres.',
        ]);

        if ($validator->fails()) {
            return redirect('softwares/create')
                ->withErrors($validator)
                ->withInput();
        }
        Software::create($request->all());
        Session::flash('success', 'Software insertado');
        return redirect()->route('softwares.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Software $software)
    {
        $tipo = 'show';
        $marca = Marca::findOrFail( $software->idmarca)->nombre;
        return View('software.show', compact('software', 'tipo', 'marca'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Software $software)
    {
        $marcas = DB::select('select id,nombre from marcas order by nombre;');
        return View( 'software.edit', compact('marcas', 'software'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Software $software)
    {
        $validator = Validator::make($request->all(), [
            'descripcion' => 'max:80',
            'idmarca' => 'required',
            'modelo' => 'required|max:20',
            'tpsoft' => 'max:20',
            'numserie' => 'max:25',
        ], [
            'descripcion.max' => 'La descripción no puede tener más de 80 caracteres.',
            'idmarca.required' => 'Introduce la marca por favor.',
            'modelo.required' => 'Introduce el modelo por favor.',
            'modelo.max' => 'El modelo no puede tener más de 20 caracteres.',
            'tpsoft.max' => 'El tipo de software no puede tener más de 20 caracteres.',
            'numserie.max' => 'El número de serie no puede tener más de 25 caracteres.',
        ]);

        if ($validator->fails()) {
            return redirect()->route('softwares.edit', $software->id)->withErrors($validator)->withInput();
        }
        $input = $request->all();
        $software->fill($input)->save();
        Session::flash('success', 'Software "' . $software->id . '" actualizado');
        return redirect()->route('softwares.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Software $software)
    {
        $software->delete();
        Session::flash('success', 'Software "' . $software->id . '" eliminado');
        return redirect()->route('softwares.index');
    }

    public function showdelete($id)
    {
        $tipo = 'delete';
        $software=Software::findOrFail($id);
        $marca = Marca::findOrFail($software->idmarca)->nombre;
        return View('software.show', compact('software', 'tipo', 'marca'));
    }

    public function dimelicencia(Request $request)
    {
        if ($request->ajax() && isset($_GET['valor'])){
            $idsoft = $_GET['valor'];
            $software = Software::find($idsoft);
            if (!$software){
                $licencia = '';
            }else{
                $licencia = $software->licencia;
            }
            return response()->json(['resultado'=>'bien','msjrespuesta'=>$licencia]);
        }else{
            Session::flash('warning','Operación no permitida');
            return redirect()->to('login');
        }
    }
}
