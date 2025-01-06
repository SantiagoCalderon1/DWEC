export class Cliente {
    public activo: boolean = true;
    public saldo: number;


    constructor(
        public ncliente: number,
        public nombre: string,
    ) {
        this.saldo = this.generarSueldo();
    }

    private generarSueldo(): number {

        return Math.floor(Math.random() * 50001);
    }

    private generarImporteOperacion(): number {
        return Math.floor(Math.random() * 100001) - 50000;
    }

    public ingresarDinero(): number {
        console.log('Ingresando dinero.');

        let importe = this.generarImporteOperacion();

        this.saldo += importe;

        this.setActivo();
        return importe;
    }

    public sacarDinero(): number {
        console.log('Sacando dinero.');

        if (!this.activo) {
            console.log('La cuenta está inactiva. No se puede realizar la operación.');
            return 0; // Devolver 0 para indicar que no se realizó la operación
        }

        let importe = this.generarImporteOperacion();

        // Si el cliente no tiene suficiente saldo, limita el importe al saldo disponible
        if (this.saldo - importe < -10000) {
            importe = this.saldo + 10000; // Límite negativo permitido
        }

        this.saldo -= importe;
        this.setActivo();
        return importe;
    }


    public setActivo(): void {
        if (this.saldo < (-10000)) {
            this.activo = false
        } else {
            this.activo = true
        }
    }
}