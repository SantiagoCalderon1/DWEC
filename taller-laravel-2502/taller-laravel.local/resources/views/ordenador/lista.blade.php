@extends('layouts.app')
@section('haydatatables')
    @include('layouts.datatables')
@endsection

@section('content')
    <div class="container">
        <div class="row justify-content-center mt-3">
            <div class="card col-lg-8">
                <div class="card-header d-inline-flex justify-content-between">
                    <h2>Relación de Ordenadores</h2>
                    <div class="navbar-text">
                        <a href="{{ route('ordenadors.create') }}" class="btn btn-primary text-white"><i class="fa fa-plus"></i>
                            Nuevo Ordenador</a>
                        <a href="{{ route('home') }}" class="btn btn-primary text-white ms-1"><i class="fa fa-arrow-left"></i>
                            Volver</a>
                    </div>
                </div>

                <div class="card-body">
                    @include('layouts.errores')
                    @if ($ordenadors->isEmpty())
                        <div>
                            <h3>No hay Ordenadores</h3>
                        </div>
                    @else
                        <table class="table table-striped mitabladedatos">
                            <thead>
                                <tr>
                                    <th>Acciones</th>
                                    <th>Número</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Ubicación</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        {{ $ordenadors->links() }}
                    @endif
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $(function () {
            var $input = $("input[name='keyword']"), $context = $(".keyword");
            $input.on("input", function () {
                var term = $(this).val();
                $context.show().unmark();
                if (term) {
                    $context.mark(term, {
                        done: function () {
                            $context.not(":has(mark)").hide();
                        }
                    });
                }
            });

            $('.mitabladedatos').DataTable({
                dom: 'Blfrtip',
                processing: true,
                serverSide: true,
                pageLength: 10,
                order: [ 1, "asc" ],
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                ajax: '{{ url("/ordenadors") }}',
                language:{
                    lengthMenu:"Mostrar _MENU_ registros por página. ",
                    zeroRecords: "Lo sentimos. No se encontraron registros.",
                    info: "Mostrando página _PAGE_ de _PAGES_",
                    infoEmpty: "No hay registros aún.",
                    infoFiltered: "(filtrados de un total de _MAX_ registros)",
                    search : "Búsqueda",
                    LoadingRecords: "Cargando ...",
                    Processing: "Procesando...",
                    SearchPlaceholder: "Comience a teclear...",
                    paginate: {
                        previous: "Anterior",
                        next: "Siguiente",
                        first: "Primero",
                        last: "Último",
                    },

                },
                columns: [
                    {data: 'action', name: 'action', orderable: false, searchable: false},
                    {data: 'numero', name: 'numero'},
                    {data: 'marca', name: 'marca'},
                    {data: 'modelo', name: 'modelo'},
                    {data: 'ubicacion', name: 'ubicacion'},

                ],
            });
        });
    </script>
@endsection
