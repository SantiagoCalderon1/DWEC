@if($items == 'create')
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="numero">Número:</label>
            <input id="numero" class="form-control" placeholder="Número" maxlength="20" name="numero" type="text">
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
        <div class="form-group col-md-6 ms-2">
            <label for="ubicacion">Ubicación:</label>
            <select class="form-control" id="idubicacion" name="idubicacion" required>
                <option value="">Seleccione una Ubicación</option>
                @foreach ($ubicaciones as $ubicacion)
                    <option value="{{$ubicacion->id}}"> {{$ubicacion->nombre}} </option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="tipo">Tipo PC:</label>
            <input id="tppc" class="form-control" placeholder="Tipo" maxlength="20" name="tppc" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" placeholder="Núm. Serie" maxlength="25" name="numserie" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="red">Tarjeta de Red:</label>
            <input id="red" class="form-control" placeholder="Red" maxlength="20" name="red" type="text">
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="maclan">MAC eth:</label>
            <input id="maclan" class="form-control" placeholder="MAC eth" maxlength="25" name="maclan" type="text">
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="iplan">IP eth:</label>
            <input id="iplan" class="form-control" placeholder="IP eth" maxlength="25" name="iplan" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="macwifi">MAC WIFI:</label>
            <input id="macwifi" class="form-control" placeholder="MAC wifi" maxlength="20" name="macwifi" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="ipwifi">IP WIFI:</label>
            <input id="ipwifi" class="form-control" placeholder="IP wifi" maxlength="25" name="ipwifi" type="text">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="hd1">HD-1:</label>
            <input id="hd1" class="form-control" placeholder="HD-1" maxlength="50" name="hd1" type="text">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="hd2">HD-2:</label>
            <input id="hd2" class="form-control" placeholder="HD-2" maxlength="50" name="hd2" type="text">
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
            <label for="numero">Número:</label>
            <input id="numero" class="form-control" placeholder="Número" maxlength="20" name="numero" type="text" value="{{ old('numero', $ordenador->numero) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="marca">Marca:</label>
            <select class="form-control" id="idmarca" name="idmarca" required>
                @foreach ($marcas as $marca)
                    @if ($ordenador->idmarca == $marca->id)
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
            <input id="modelo" class="form-control" placeholder="Modelo" maxlength="20" name="modelo" type="text" value="{{ old('modelo', $ordenador->modelo) }}" required>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="ubicacion">Ubicación:</label>
            <select class="form-control" id="idubicacion" name="idubicacion" required>
                @foreach ($ubicaciones as $ubicacion)
                    @if ($ordenador->idubicacion == $ubicacion->id)
                        <option value="{{$ubicacion->id}}" selected> {{$ubicacion->nombre}} </option>
                    @else
                        <option value="{{$ubicacion->id}}"> {{$ubicacion->nombre}} </option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="tppc">Tipo PC:</label>
            <input id="tppc" class="form-control" placeholder="Tipo" maxlength="20" name="tppc" type="text" value="{{ old('tppc', $ordenador->tppc) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" placeholder="Núm. Serie" maxlength="25" name="numserie" type="text" value="{{ old('numserie', $ordenador->numserie) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="red">Tarjeta de Red:</label>
            <input id="red" class="form-control" placeholder="Red" maxlength="20" name="red" type="text" value="{{ old('red', $ordenador->red) }}">
        </div>
        <div class="form-group col-md-4">
            <label for="maclan">MAC eth:</label>
            <input id="maclan" class="form-control" placeholder="MAC eth" maxlength="25" name="maclan" type="text" value="{{ old('maclan', $ordenador->maclan) }}">
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="iplan">IP eth:</label>
            <input id="iplan" class="form-control" placeholder="IP eth" maxlength="20" name="iplan" type="text" value="{{ old('iplan', $ordenador->iplan) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="macwifi">MAC wifi:</label>
            <input id="macwifi" class="form-control" placeholder="MAC wifi" maxlength="25" name="macwifi" type="text" value="{{ old('macwifi', $ordenador->macwifi) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="ipwifi">IP wifi:</label>
            <input id="ipwifi" class="form-control" placeholder="IP wifi" maxlength="20" name="ipwifi" type="text" value="{{ old('ipwifi', $ordenador->ipwifi) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="hd1">HD-1:</label>
            <input id="hd1" class="form-control" placeholder="HD-1" maxlength="50" name="hd1" type="text" value="{{ old('hd1', $ordenador->hd1) }}">
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="hd2">HD-2:</label>
            <input id="hd2" class="form-control" placeholder="HD-1" maxlength="50" name="hd2" type="text" value="{{ old('hd2', $ordenador->hd2) }}">
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-12">
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" name="observaciones" class="form-control" placeholder="Introduce las observaciones">{{ old('observaciones', $ordenador->observaciones) }}</textarea>
        </div>
    </div>
@else
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="numero">Número:</label>
            <input id="numero" class="form-control" name="numero" type="text" value="{{ old('numero', $ordenador->numero) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="marca">Marca:</label>
            <input id="marca" class="form-control" name="marca" type="text" value="{{ $marca }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="modelo">Modelo:</label>
            <input id="modelo" class="form-control" name="modelo" type="text" value="{{ old('modelo', $ordenador->modelo) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="ubicacion">Ubicación:</label>
            <input id="ubicacion" class="form-control" name="ubicacion" type="text" value="{{ $ubicacion }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="tppc">Tipo PC:</label>
            <input id="tppc" class="form-control" name="tppc" type="text" value="{{ old('tppc', $ordenador->tppc) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="numserie">Núm. serie:</label>
            <input id="numserie" class="form-control" name="numserie" type="text" value="{{ old('numserie', $ordenador->numserie) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-4">
            <label for="red">RED:</label>
            <input id="red" class="form-control" name="red" type="text" value="{{ old('red', $ordenador->red) }}" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="maclan">MAC eth:</label>
            <input id="maclan" class="form-control" name="maclan" type="text" value="{{ old('maclan', $ordenador->maclan) }}" readonly>
        </div>
        <div class="form-group col-md-4 ms-2">
            <label for="iplan">IP eth:</label>
            <input id="iplan" class="form-control" name="iplan" type="text" value="{{ old('iplan', $ordenador->iplan) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="macwifi">MAC wifi:</label>
            <input id="macwifi" class="form-control" name="macwifi" type="text" value="{{ old('macwifi', $ordenador->macwifi) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="ipwifi">IP wifi:</label>
            <input id="ipwifi" class="form-control" name="ipwifi" type="text" value="{{ old('ipwifi', $ordenador->ipwifi) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-6">
            <label for="hd1">HD-1:</label>
            <input id="hd1" class="form-control" name="hd1" type="text" value="{{ old('hd1', $ordenador->hd1) }}" readonly>
        </div>
        <div class="form-group col-md-6 ms-2">
            <label for="hd2">HD-2:</label>
            <input id="hd2" class="form-control" name="hd2" type="text" value="{{ old('hd2', $ordenador->hd2) }}" readonly>
        </div>
    </div>
    <div class="d-flex p-2">
        <div class="form-group col-md-12">
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" name="observaciones" class="form-control" placeholder="Introduce las observaciones" readonly>{{ $ordenador->observaciones }}</textarea>
        </div>
    </div>
@endif
