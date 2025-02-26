@extends('layouts.app')
@section('content')

<div class="container">
    <div class="row justify-content-center mt-3">
        <div class="card col-lg-8">
            <div class="card-header d-inline-flex justify-content-between">
                @if($tipo == 'delete')
                    <h2>Eliminar Asignación</h2>
                @else
                    <h2>Consultar Asignación</h2>
                @endif
                 <div class="navbar-text">
                    <a href="{{route('soft_pcs.index')}}" class="btn btn-primary text-white"><i class="fa fa-arrow-left"></i> Volver</a>
                </div>
            </div>
            <div class="card-body">
                @include('layouts.errores')
                <form method="POST" action="{{ route('soft_pcs.destroy', $soft_pc) }}" accept-charset="UTF-8">
                    @csrf
                    @method('DELETE')
                    @include('soft_pc.fieldsform', ['items'=> 'show'])
                    @if($tipo == 'delete')
                        <input name="borrar" id="borrar" class="btn btn-danger btn-sm mt-3" type="submit" value="BORRAR">
                    @endif
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
