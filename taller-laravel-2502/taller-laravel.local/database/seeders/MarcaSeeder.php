<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;
use Str;

class MarcaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $marcas=['HP','IBM','Microsoft','DELL','Lenovo','Otros'];
        foreach ($marcas as $key => $value) {
            DB::table('marcas')->insert([
                'nombre' => $value,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
        for ($conta = 0; $conta < 30; $conta++) {
            DB::table( 'marcas')->insert([
                'nombre' => 'Marca '.Str::random(5),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
