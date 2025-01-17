import { Component } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-logout',
  standalone: false,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  // Definimos en contructor la variable del servicio, que acontinuación usaremos.
  constructor(private _loginService: LoginService){}

  // Cuando arranque la app, llamaremos a la función exitApp del servicio, cuya función era
  // definirnos no identificados  con lo cual solo tendremos acceso al /login
  ngOnInit(){
    this._loginService.exitApp();
  }
}
