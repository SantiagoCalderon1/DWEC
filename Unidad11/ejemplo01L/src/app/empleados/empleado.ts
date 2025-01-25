export class Empleado {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public cargo: string,
    public contratado: number = 0
  ) {}
}
