export class Factura {
    constructor(
      public numero: number,
      public fecha: string,
      public iva: boolean = false,
      public cantidad:number
    ) { }  
  }