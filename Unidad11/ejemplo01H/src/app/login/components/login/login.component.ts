import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  // Definimos la variables par ahcer uso del servicio y del router
  constructor(
    private _loginService: LoginService,
    private _route: Router
  ) { }

  // Definimos la variables donde guardaremos el username y password del formulario
  public username = '';
  public password = '';

  // Definimos el metodo que comprobará si las credenciales son correctas, haciendo uso del metodo
  //VerifyUser del servicio, y si es así redirigimos al inicio, si no notificamos y vacíamos la variables
  verifyUser(){
    if (this._loginService.verifyUser(this.username, this.password)) {  
      this._route.navigate(['/bienvenido']);
    }else{
      alert("Usuario o contraseña incorrectos");
      this.username = '';
      this.password = '';
    }
  }
}