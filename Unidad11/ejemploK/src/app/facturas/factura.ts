export class Factura {
    constructor(
      public id: number,
      public cliente: string,
      public fecha: string,
      public iva: boolean = false,
      public importe:number
    ) { }  
  }