@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center mt-3">
        <div class="card col-lg-10">
            <div class="card-header d-inline-flex justify-content-between">
                <h2>Instalación SW a todos los PCs de una ubicación</h2>
                <div class="navbar-text">
                    <a href="{{route('home')}}" class="btn btn-primary"><i class="fa fa-arrow-left"></i> Volver</a>
                </div>
            </div>
            <div class="card-body">
                @include('layouts.errores')
                <form method="POST" action="{{route('storeubicsoft')}}" accept-charset="UTF-8">
                    @csrf
                    @include('soft_pc.fieldsform', ['items'=> 'createubic'])
                    <input name="grabar" id="grabar" class="btn btn-primary btn-sm mt-3" type="submit" value="Grabar">
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
