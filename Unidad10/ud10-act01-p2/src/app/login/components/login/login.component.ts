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
  constructor(
    private _loginService: LoginService,
    private _route: Router
  ) { }

  public username = '';
  public password = '';

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
