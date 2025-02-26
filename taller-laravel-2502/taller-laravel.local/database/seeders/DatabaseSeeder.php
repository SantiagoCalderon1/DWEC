<?php

namespace Database\Seeders;

use DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);*/
        $this->truncaTablas(['marcas', 'ubicacions', 'ordenadors', 'monitors', 'teclados', 'ratons', 'softwares', 'componentes', 'impresoras', 'dispreds', 'soft_pcs']);
        $this->call([
            MarcaSeeder::class,
            UbicacionSeeder::class,
            OrdenadorSeeder::class,
            MonitorSeeder::class,
            TecladoSeeder::class,
            RatonSeeder::class,
            SoftwareSeeder::class,
            ComponenteSeeder::class,
            ImpresoraSeeder::class,
            DispredSeeder::class,
            Soft_pcSeeder::class
        ]);
    }
    protected function truncaTablas(array $tablas){
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        foreach ($tablas as $tabla) {
            DB::table($tabla)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
