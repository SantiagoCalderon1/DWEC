<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monitors', function (Blueprint $table) {
            $table->id();
            $table->string('numero', 20)->nullable($value = true);
            $table->unsignedBigInteger('idmarca');
            $table->foreign('idmarca', 'fk_monitors_marcas')->references('id')->on('marcas')->onDelete('restrict');
            $table->string('modelo', 20)->nullable($value = true);
            $table->unsignedBigInteger('idubicacion');
            $table->foreign('idubicacion', 'fk_monitors_ubicacions')->references('id')->on('ubicacions')->onDelete('restrict');
            $table->string('tpmon', 20)->nullable($value = true);
            $table->string('numserie', 25)->nullable($value = true);
            $table->string('tamano', 20)->nullable($value = true);
            $table->boolean('tienedvi')->default(false);
            $table->boolean('tienehdmi')->default(false);
            $table->longText('observaciones')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitors');
    }
};
