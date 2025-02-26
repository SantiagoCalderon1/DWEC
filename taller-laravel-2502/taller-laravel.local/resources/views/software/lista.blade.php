@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center mt-3">
            <div class="card col-lg-10">
                <div class="card-header d-inline-flex justify-content-between">
                    <h2>Relación de Softwares</h2>
                    <div class="navbar-text">
                        <a href="{{ route('softwares.create') }}" class="btn btn-primary text-white"><i class="fa fa-plus"></i>
                            Nuevo Software</a>
                        <a href="{{ route('home') }}" class="btn btn-primary text-white ms-1"><i class="fa fa-arrow-left"></i>
                            Volver</a>
                    </div>
                </div>

                <div class="card-body">
                    @include('layouts.errores')
                    @if ($softwares->isEmpty())
                        <div>
                            <h3>No hay Softwares</h3>
                        </div>
                    @else
                        <table class="table table-striped">
                            <tr>
                                <th>Acciones</th>
                                <th>Descripción</th>
                                <th>Licencia</th>
                            </tr>
                            @foreach ($softwares as $software)
                                <tr>
                                    <td>
                                        <a href="softwares/{{ $software->id }}" class="btn btn-sm btn-primary me-1"><i class="fa fa-eye"></i> Ver</a>
                                        <a href="softwares/{{ $software->id }}/edit" class="btn btn-sm btn-warning me-1"><i
                                                class="fa fa-edit"></i> Modif.</a>
                                        <a href="softwares/showdelete/{{ $software->id }}" id="{{ $software->id }}" class="btn btn-sm btn-danger"><i class="fa fa-times"></i> Borrar</a>
                                    </td>
                                    <td>{{ $software->descripcion }}</td>
                                    <td>{{ $software->licencia }}</td>
                                </tr>
                            @endforeach

                        </table>
                        {{ $softwares->links() }}
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
