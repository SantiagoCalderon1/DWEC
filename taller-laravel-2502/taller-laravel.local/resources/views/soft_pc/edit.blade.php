@extends('layouts.app')
@section('content')

<div class="container">
    <div class="row justify-content-center mt-3">
        <div class="card col-lg-10">
            <div class="card-header d-inline-flex justify-content-between">
                <h2>Modificar Asignación</h2>
                <div class="navbar-text">
                    <a href="{{route('soft_pcs.index')}}" class="btn btn-primary text-white"><i class="fa fa-arrow-left"></i> Volver</a>
                </div>
            </div>
            <div class="card-body">
                @include('layouts.errores')
                <form method="POST" action="{{ route('soft_pcs.update', $soft_pc) }}" accept-charset="UTF-8">
                    @csrf
                    @method('PUT')
                    @include('soft_pc.fieldsform', ['items'=> 'edit'])
                    <input name="grabar" id="grabar" class="btn btn-primary btn-sm mt-3" type="submit" value="Grabar">
                </form>
            </div>
        </div>
    </div>
</div>
@include('soft_pc.ajax')
@endsection
