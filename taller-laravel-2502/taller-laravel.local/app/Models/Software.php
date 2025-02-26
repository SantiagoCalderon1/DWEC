<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Software extends Model
{
    protected $fillable = [
        'descripcion', 'idmarca', 'modelo', 'tpsoft', 'numserie', 'licencia', 'actualizar', 'origen',
        'hd', 'observaciones'
    ];
    protected $table = 'softwares';
}
