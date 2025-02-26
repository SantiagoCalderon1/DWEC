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
        Schema::create('softwares', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 80);
            $table->unsignedBigInteger('idmarca');
            $table->foreign('idmarca', 'fk_softwares_marcas')->references('id')->on('marcas')->onDelete('restrict');
            $table->string('modelo', 20)->nullable($value = true);
            $table->string('tpsoft', 20)->nullable($value = true);
            $table->string('numserie', 25)->nullable($value = true);
            $table->string('licencia', 25)->nullable($value = true);
            $table->boolean('actualizar')->default(false);
            $table->string('origen', 50)->nullable($value = true);
            $table->string('hd', 50)->nullable($value = true);
            $table->longText('observaciones')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('softwares');
    }
};
