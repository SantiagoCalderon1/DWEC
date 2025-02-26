@if($items == 'create')
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="descripcion">Descripción:</label>
            <input id="descripcion" class="form-control" placeholder="Descripción" maxlength="80" name="descripcion" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="marca">Marca:</label>
            <select class="form-control" id="idmarca" name="idmarca" required>
                <option value="">Seleccione una Marca</option>
                @foreach ($marcas as $marca)
                    <option value="{{$marca->id}}"> {{$marca->nombre}} </option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="modelo">Modelo:</label>
            <input id="modelo" class="form-control" placeholder="Modelo" maxlength="20" name="modelo" type="text" required>
        </div>
        <div class="form-group col-md-6">
            <label for="tpsoft">Tipo de software:</label>
            <input id="tpsoft" class="form-control" placeholder="Tipo de software" maxlength="20" name="tpsoft" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" placeholder="Núm. Serie" maxlength="25" name="numserie" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="licencia">Licencia:</label>
            <input id="licencia" class="form-control" placeholder="Licencia" maxlength="25" name="licencia" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6 ms-2">
            <label for="origen">Origen:</label>
            <input id="origen" class="form-control" placeholder="Origen" maxlength="50" name="origen" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="hd">HD:</label>
            <input id="hd" class="form-control" placeholder="HD" maxlength="50" name="hd" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-12">
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" name="observaciones" class="form-control" placeholder="Introduce las observaciones"></textarea>
        </div>
    </div>
@elseif ($items == 'edit')
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="descripcion">Descripción:</label>
            <input id="descripcion" class="form-control" placeholder="Descripción" maxlength="80" name="descripcion" type="text" value="{{ old('descripcion', $software->descripcion) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="marca">Marca:</label>
            <select class="form-control" id="idmarca" name="idmarca" required>
                @foreach ($marcas as $marca)
                    @if ($software->idmarca == $marca->id)
                        <option value="{{$marca->id}}" selected> {{$marca->nombre}} </option>
                    @else
                        <option value="{{$marca->id}}"> {{$marca->nombre}} </option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="modelo">Modelo:</label>
            <input id="modelo" class="form-control" placeholder="Modelo" maxlength="20" name="modelo" type="text" value="{{ old('modelo', $software->modelo) }}" required>
        </div>
        <div class="form-group col-md-6">
            <label for="tpsoft">Tipo Software:</label>
            <input id="tpsoft" class="form-control" placeholder="Tipo Software" maxlength="20" name="tpsoft" type="text" value="{{ old('tpsoft', $software->tpsoft) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" placeholder="Núm. Serie" maxlength="25" name="numserie" type="text" value="{{ old('numserie', $software->numserie) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="licencia">Licencia:</label>
            <input id="licencia" class="form-control" placeholder="Licencia" maxlength="25" name="licencia" type="text" value="{{ old('licencia', $software->licencia) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6 ms-2">
            <label for="origen">Origen:</label>
            <input id="origen" class="form-control" placeholder="Origen" maxlength="50" name="origen" type="text" value="{{ old('origen', $software->origen) }}">
        </div>
        <div class="form-group col-md-6">
            <label for="hd">HD:</label>
            <input id="hd" class="form-control" placeholder="HD" maxlength="50" name="hd" type="text" value="{{ old('hd', $software->hd) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-12">
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" name="observaciones" class="form-control" placeholder="Introduce las observaciones">{{ old('observaciones', $software->observaciones) }}</textarea>
        </div>
    </div>
@else
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="descripcion">Descripción:</label>
            <input id="descripcion" class="form-control" name="descripcion" type="text" value="{{ old('descripcion', $software->descripcion) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="marca">Marca:</label>
            <input id="marca" class="form-control" name="marca" type="text" value="{{ $marca }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="modelo">Modelo:</label>
            <input id="modelo" class="form-control" name="modelo" type="text" value="{{ old('modelo', $software->modelo) }}" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="tpsoft">Tipo Software:</label>
            <input id="tpsoft" class="form-control" name="tpsoft" type="text" value="{{ old('tpsoft', $software->tpsoft) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
    <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" name="numserie" type="text" value="{{ old('numserie', $software->numserie) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="licencia">Licencia:</label>
            <input id="licencia" class="form-control" name="licencia" type="text" value="{{ old('licencia', $software->licencia) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="origen">Origen:</label>
            <input id="origen" class="form-control" name="origen" type="text" value="{{ old('origen', $software->origen) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="hd">HD:</label>
            <input id="hd" class="form-control" name="hd" type="text" value="{{ old('hd', $software->hd) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-12">
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" name="observaciones" class="form-control" placeholder="Introduce las observaciones" readonly>{{ $software->observaciones }}</textarea>
        </div>
    </div>
@endif
