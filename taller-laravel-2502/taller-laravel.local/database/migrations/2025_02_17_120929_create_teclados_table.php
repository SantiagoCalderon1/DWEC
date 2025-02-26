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
        Schema::create('teclados', function (Blueprint $table) {
            $table->id();
            $table->string('numero', 20)->nullable($value = true);
            $table->unsignedBigInteger('idmarca');
            $table->foreign('idmarca', 'fk_teclados_marcas')->references('id')->on('marcas')->onDelete('restrict');
            $table->string('modelo', 20);
            $table->unsignedBigInteger('idubicacion');
            $table->foreign('idubicacion', 'fk_teclados_ubicacions')->references('id')->on('ubicacions')->onDelete('restrict');
            $table->string('tptec', 20)->nullable($value = true);
            $table->string('numserie', 25)->nullable($value = true);
            $table->longText('observaciones')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teclados');
    }
};
