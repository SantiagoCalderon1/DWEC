@extends('layouts.app')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
@section('hayconfirmaciones')
    <link rel="stylesheet" href="{{ asset('/css/jquery-confirm.min.css') }}">
    <script src="{{ asset('/js/jquery-confirm.min.js') }}"></script>
@endsection
@section('content')
<div class="container">
    <div class="row justify-content-center mt-3">
        <div class="card col-lg-12">
            <div class="card-header d-inline-flex justify-content-between">
                <h2>Relación de Activos</h2>
                <div class="navbar-text">
                    <a href="{{route('home')}}" class="btn btn-primary ms-1 text-white"><i class="fa fa-arrow-left"></i> Volver</a>
                </div>
            </div>
            <div class="card-body">
                @include('layouts.errores')
                @if ($activos->isEmpty())
                    <div><h3>No hay Activos para mostrar</h3></div>
                @else
                    <table class="table table-striped">
                        <tr>
                            <th>Acciones</th>
                            <th>Activo</th>
                            <th>Número</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ubicación</th>

                        </tr>
                        @foreach ($activos as $activo)
                        <tr>
                            <td>
                                <a href="#" class="btn btn-sm btn-warning" onclick="cambiaubicacion({{ $activo->id }},'{{ $activo->activo }}','{{ $activo->ubicacion }}',this)"><i class="fa fa-edit"></i> Cambiar ubic.</a>
                            </td>
                            <td>{{ $activo->activo }}</td>
                            <td>{{ $activo->numero }}</td>
                            <td>{{ $activo->marca }}</td>
                            <td>{{ $activo->modelo }}</td>
                            <td>{{ $activo->ubicacion }}</td>
                        </tr>
                        @endforeach
                    </table>
                    {{ $activos->links() }}
                @endif
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
function cambiaubicacion(id,activo,ubicacion,obj){
    // alert("Hola "+id+" "+activo+" "+ubicacion);
    // alert($(obj).parent().next().next().next().next().next().html());
    var html = '<div class="d-flex p-2">';
    html += '<div class="form-group col-md-10">';
    html += '<label for="ubicacionact">Ubicación actual:</label>';
    html += '<input id="ubicacionact" class="form-control" readonly name="ubicacionact" type="text" value="'+ubicacion+'">';
    html += '</div></div>';
    html += '<div class="d-flex p-2">';
    html += '<div class="form-group col-md-10">';
    html += '<label for="nuevubicacion">Ubicación nueva:</label>';
    html += '<select class="form-control" id="nuevubicacion" name="nuevubicacion" required>';
    html += '<option value="">Elige nueva ubicación</option>';
    html += '@foreach ($ubicaciones as $ubicacion)';
    html += '<option value="{{$ubicacion->id}}"> {{$ubicacion->nombre}} </option>';
    html += '@endforeach';
    html += '/select>';
    html += '</div></div>';

    $.confirm({
        title: 'Cambiar Ubicación',
        content: html,
        buttons: {
            confirmar: function () {
                texto = "";
                var nuevaubicacion=$('#nuevubicacion option:selected').text();
                error = ($('#nuevubicacion').val()=='');
                if (error){
                    texto ="Tienes que seleccionar una nueva ubicación"
                }else{
                    error = (nuevaubicacion==ubicacion);
                    if (error){
                        texto="Tienes que elegir una ubicación distinta a la actual"
                    }
                };
                if (error){
                    $.alert({
                        title: '',
                        content: texto,
                        buttons:{
                            aceptar: {
                                text: 'Aceptar'
                            }
                        }
                    });
                }else{
                    $.ajax({
                        url: '{{ url("/cambiaubicacion") }}',
                        type: 'GET',
                        retrieve:true,
                        dataType: "JSON",
                        data: {
                            "id": id,
                            "activo": activo,
                            "ubicacion": $('#nuevubicacion').val()
                        },
                        success: function (result)
                        {
                            if (result.resultado == 'bien'){
                                $(obj).parent().next().next().next().next().next().html(nuevaubicacion)
                            }
                            $.alert({
                                title: '',
                                content: result.msjrespuesta,
                                buttons:{
                                    aceptar: {
                                        text: 'Aceptar'
                                    }
                                }
                            });
                        }
                    });
                }
            },
            cancelar: function () {
                $.alert({
                    title: '',
                    content: 'Cambio cancelado',
                    buttons:{
                        aceptar: {
                            text: 'Aceptar'
                        }
                    }
                });
    }
        }
    });

}
</script>

@endsection
