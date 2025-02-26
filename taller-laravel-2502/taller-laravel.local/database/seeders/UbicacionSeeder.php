<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;
use Str;

class UbicacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ubicaciones = ['Ubicación 1', 'Ubicación 2', 'Ubicación 3', 'Ubicación 4', 'Ubicación 5', 'Ubicación 6'];
        foreach ($ubicaciones as $key => $value) {
            DB::table('ubicacions')->insert([
                'nombre' => $value,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
        for ($conta = 0; $conta < 30; $conta++) {
            DB::table( 'ubicacions')->insert([
                'nombre' => 'Ubicación '.Str::random(5),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
