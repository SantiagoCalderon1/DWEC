<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;

class Soft_pcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($conta = 0; $conta < 10; $conta++) {
            DB::table('soft_pcs')->insert([
                'idpc' => random_int(1, 9),
                'idsoft' => random_int(1, 9),
                'fechainst' => Carbon::now()->format('Y-m-d'),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
