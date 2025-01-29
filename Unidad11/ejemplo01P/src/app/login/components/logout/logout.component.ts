import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  standalone: false,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private _loginService: LoginService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit(){
    this._loginService.salirAplicacion()
    this.toastr.success('Has abandonado la aplicación correctamente', 'Hasta pronto');
  }
  volverAentrar(){
    this._route.navigate(['/login']);
  }
}
