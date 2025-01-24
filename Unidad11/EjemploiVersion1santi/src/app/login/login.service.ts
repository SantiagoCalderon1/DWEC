import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private USUARIO:string = 'santi';
  private CONTRASENYA:string = 'santi';
  private identificado: boolean = false;
  
  estaIdentificado(): boolean {
    console.log('comprobado identificado: '+this.identificado);
    // return this.identificado;
    return true;
  }
  compruebaUsuario(usuario:string, contrasenya:string):boolean{
    this.identificado = usuario == this.USUARIO && contrasenya == this.CONTRASENYA;
    return this.identificado;
  }
  salirAplicacion(){
    this.identificado = false;
  }
}
