@extends('layouts.app')
@section('content')

<div class="container">
    <div class="row justify-content-center mt-3">
        <div class="card col-lg-8">
            <div class="card-header d-inline-flex justify-content-between">
                <h2>Modificar marca</h2>
                <div class="navbar-text">
                    <a href="{{route('marcas.index')}}" class="btn btn-primary"><i class="fa fa-arrow-left"></i> Volver</a>
                </div>
            </div>
            <div class="card-body">
                @include('layouts.errores')
                <form method="POST" action="{{ route('marcas.update', $marca) }}" accept-charset="UTF-8">
                    @csrf
                    @method('PUT')
                    @include('marca.fieldsform', ['items'=> 'edit'])
                    <input name="grabar" id="grabar" class="btn btn-primary btn-sm mt-3" type="submit" value="Grabar">
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
