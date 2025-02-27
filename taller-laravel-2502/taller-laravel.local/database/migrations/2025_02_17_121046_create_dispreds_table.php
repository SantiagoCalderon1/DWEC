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
        Schema::create('dispreds', function (Blueprint $table) {
            $table->id();
            $table->string('numero', 20)->nullable($value = true);
            $table->unsignedBigInteger('idmarca');
            $table->foreign('idmarca', 'fk_dispreds_marcas')->references('id')->on('marcas')->onDelete('restrict');
            $table->string('modelo', 20)->nullable($value = true);
            $table->unsignedBigInteger('idubicacion');
            $table->foreign('idubicacion', 'fk_dispreds_ubicacions')->references('id')->on('ubicacions')->onDelete('restrict');
            $table->string('tpdisp', 20)->nullable($value = true);
            $table->string('numserie', 25)->nullable($value = true);
            $table->string('red', 20)->nullable($value = true);
            $table->macAddress('maclan')->nullable($value = true);
            $table->ipAddress('iplan')->nullable($value = true);
            $table->longText('observaciones')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispreds');
    }
};
