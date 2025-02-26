<div class="form-group">
    <label for="nombre">Marca:</label>
    @if ($items == 'create')
        <input id="nombre" class="form-control" placeholder="Introduce la marca" maxlength="50" name="nombre" type="text">
    @elseif ($items == 'edit')
        <input id="nombre" class="form-control" placeholder="Introduce la marca" maxlength="50" name="nombre" type="text" value="{{ old('nombre', $marca->nombre) }}">
    @else
        <input id="nombre" class="form-control" name="nombre" type="text" value="{{ old('nombre', $marca->nombre) }}" disabled readonly>
    @endif
</div>
