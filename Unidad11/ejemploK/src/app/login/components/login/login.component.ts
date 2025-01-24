import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { prefJavValidator } from '../../../validadores';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _route: Router, private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      usuario: ['', [Validators.required, prefJavValidator()]],
      contrasenya: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  ngOnInit(): void {
    this.loginForm.get('usuario')?.valueChanges
      .subscribe(notif => this.updateNotifMethod(notif));
  }
  compruebaUsuario(): void {
    if (this.loginForm.valid) {
      if (this._loginService.compruebaUsuario(this.loginForm.get('usuario')?.value, this.loginForm.get('contrasenya')?.value)) {
        console.log('Usuario identificado');
        this._route.navigate(['/bienvenido']);
      } else {
        alert('Usuario o contraseña incorrectos, íntentalo de nuevo');
        this.loginForm.setValue({
          usuario: '',
          contrasenya: '',
        });
      }
    }else{
      alert('Datos introducidos no válidos ');
    }
  }
  // Método para obtener los errores del campo si los necesitas
  get usuario() {
    return this.loginForm.get('usuario');
  }
  updateNotifMethod(notif:any){
    console.log(notif);
  }
}
