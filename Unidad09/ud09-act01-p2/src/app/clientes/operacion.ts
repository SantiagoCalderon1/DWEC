export class Operacion{
    constructor(
        public noperacion: number,
        public ncliente: number,
        public nombreCliente: string,
        public importe: number,
        public tipoOperacion: string, //esta la he agregado
        public estadoOperacion: string
    ){}
}