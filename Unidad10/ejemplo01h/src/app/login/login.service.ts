import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
// Definimos las variables para el inicio de sesión, que en mi caso son mi nombre.
  public username : string = 'santi';
  public password : string = 'santi';
  public identified: boolean = false;
  
  constructor() { }

  // Definimos el método para iniciar sesión.
  verifyUser(username : string, password : string) : boolean{
    this.identified = (username === this.username && password === this.password);
    return this.identified;
  }

  // DEfinimos un metodo booleano que será el que nos diga si está o no identificado
  isIdentified() : boolean{
    //return this.identified;  Esto debemos cambiarlo más adelante
    return true;
  }

  // Este metodo nos hará no identificado cuando le demos click al link de salir
  exitApp() : void {
    this.identified = false;
  }

}
