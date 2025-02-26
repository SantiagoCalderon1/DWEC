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
        Schema::create('soft_pcs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idpc');
            $table->foreign( 'idpc', 'fk_soft_pcs_ordenadors')->references('id')->on( 'ordenadors')->onDelete('restrict');
            $table->unsignedBigInteger('idsoft');
            $table->foreign( 'idsoft', 'fk_soft_pcs_softwares')->references('id')->on( 'softwares')->onDelete('restrict');
            $table->date('fechainst')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soft_pcs');
    }
};
