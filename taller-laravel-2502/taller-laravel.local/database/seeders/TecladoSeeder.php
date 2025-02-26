<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;
use Str;

class TecladoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($conta = 0; $conta < 10; $conta++) {
            DB::table('teclados')->insert([
                'numero' => Str::random(10),
                'idmarca' => random_int(1, 6),
                'modelo' => Str::random(10),
                'idubicacion' => random_int(1, 6),
                'tptec' => Str::random(10),
                'numserie' => Str::random(15),
                'observaciones' => Str::random(150),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
