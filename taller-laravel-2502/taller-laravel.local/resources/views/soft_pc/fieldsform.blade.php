@if($items == 'create')
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="numero">Número PC:</label>
            <select class="form-control" id="idpc" name="idpc" required>
                <option value="">Seleccione un PC</option>
                @foreach ($ordenadores as $ordenador)
                    <option value="{{$ordenador->id}}"> {{$ordenador->numero}} </option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-4">
            <label for="marca">Marca PC:</label>
            <input id="marca" class="form-control ms-2" name="marca" type="text" readonly>
        </div>
        <div class="form-group col-md-4">
            <label for="ubicacion">Ubicación:</label>
            <input id="ubicacion" class="form-control ms-3" name="ubicacion" type="text" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-5">
            <label for="software">Software:</label>
            <select class="form-control" id="idsoft" name="idsoft" required>
                <option value="">Seleccione un Software</option>
                @foreach ($softwares as $software)
                    <option value="{{$software->id}}"> {{$software->descripcion}} </option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="licencia">Licencia:</label>
            <input id="licencia" class="form-control" name="licencia" type="text" readonly>
        </div>
        <div class="form-group col-md-3 ms-2">
            <label for="fechainst">Fecha de Instalación:</label>
            <input id="fechainst" class="form-control" value="{{ \Carbon\Carbon::now()->toDateString() }}" name="fechainst" type="date" required>
        </div>
    </div>
@elseif ($items == 'edit')
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="numero">Número:</label>
            <select class="form-control" id="idpc" name="idpc" required>
                @foreach ($ordenadores as $ordenador)
                    @if ($ordenador->id == $soft_pc->idpc)
                        <option value="{{$ordenador->id}}" selected> {{$ordenador->numero}} </option>
                    @else
                        <option value="{{$ordenador->id}}"> {{$ordenador->numero}} </option>
                    @endif
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="marca">Marca PC:</label>
            <input id="marca" class="form-control ms-2" name="marca" type="text" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="ubicacion">Ubicación:</label>
            <input id="ubicacion" class="form-control ms-3" name="ubicacion" type="text" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-5">
            <label for="software">Software:</label>
            <select class="form-control" id="idsoft" name="idsoft" required>
                @foreach ($softwares as $software)
                    @if ($soft_pc->idsoftware == $software->id)
                        <option value="{{$software->id}}" selected> {{$software->descripcion}} </option>
                    @else
                        <option value="{{$software->id}}"> {{$software->descripcion}} </option>
                    @endif
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="modelo">Licencia:</label>
            <input id="licencia" class="form-control" name="licencia" type="text" readonly>
        </div>
        <div class="form-group col-md-3 ms-2">
            <label for="fechainst">Fecha de Instalación:</label>
            <input id="fechainst" class="form-control" value="{{ old('fechainst', $soft_pc->fechainst) }}" name="fechainst" type="date" required>
        </div>
    </div>
@elseif ($items == 'createubic')
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="ubicacion">Ubicación:</label>
            <select class="form-control" id="idubicacion" name="idubicacion" required>
                @foreach ($ubicaciones as $ubicacion)
                    <option value="{{$ubicacion->id}}"> {{$ubicacion->nombre}} </option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-9">
            <label for="software">Software:</label>
            <select class="form-control" id="idsoft" name="idsoft" required>
                @foreach ($softwares as $software)
                    <option value="{{$software->id}}"> {{$software->descripcion}} </option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-3 ms-2">
            <label for="fechainst">Fecha de Instalación:</label>
            <input id="fechainst" class="form-control" value="{{ \Carbon\Carbon::now()->toDateString() }}" name="fechainst" type="date" required>
        </div>
    </div>
@else
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="numero">Número PC:</label>
            <input id="numero" class="form-control" name="numero" type="text" value="{{ $ordenador }}" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="marca">Marca PC:</label>
            <input id="marca" class="form-control" name="marca" type="text" value="{{ $marca }}" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="ubicacion">Ubicacion:</label>
            <input id="ubicacion" class="form-control" name="ubicacion" type="text" value="{{ $ubicacion }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-5">
            <label for="software">Software:</label>
            <input id="software" class="form-control" name="software" type="text" value="{{ $software }}" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="licencia">Licencia:</label>
            <input id="licencia" class="form-control" name="licencia" type="text" value="{{ $licencia }}" readonly>
        </div>
        <div class="form-group col-md-3 ms-2">
            <label for="fechainst">Fecha de instalación:</label>
            <input id="fechainst" class="form-control" name="fechainst" type="text" value="{{ $soft_pc->fechainst }}" readonly>
        </div>
    </div>
@endif
