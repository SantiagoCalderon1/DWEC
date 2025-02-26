<div class="form-group">
    <label for="nombre">Ubicación:</label>
    @if ($items == 'create')
        <input id="nombre" class="form-control" placeholder="Introduce la ubicación" maxlength="50" name="nombre" type="text">
    @elseif ($items == 'edit')
        <input id="nombre" class="form-control" placeholder="Introduce la ubicación" maxlength="50" name="nombre" type="text" value="{{ old('nombre', $ubicacion->nombre) }}">
    @else
        <input id="nombre" class="form-control" name="nombre" type="text" value="{{ old('nombre', $ubicacion->nombre) }}" disabled readonly>
    @endif
</div>
