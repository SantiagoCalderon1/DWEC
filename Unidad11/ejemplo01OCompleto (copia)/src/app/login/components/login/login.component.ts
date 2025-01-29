import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _route: Router, private _fb: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this._fb.group({
      usuario: ['', [Validators.required]],
      contrasenya: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  ngOnInit(): void {
    this.loginForm.get('usuario')?.valueChanges
      .subscribe(notif => this.updateNotifMethod(notif));
  }
  compruebaUsuario(): void {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.get('usuario')?.value, this.loginForm.get('contrasenya')?.value).subscribe({
        next: (resultado) => {
          this._loginService.saveToken(resultado.token);
          this.toastr.success('Usuario autentificado correctamente', 'Usuario autentificado');
          this._route.navigate(['/bienvenido']);
        },
        error: (error) => {
          alert('Usuario o contraseña incorrectos, íntentalo de nuevo ('+error.statusText+')');
          this.loginForm.setValue({
            usuario: '',
            contrasenya: '',
          });
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    } else this.toastr.error('Datos introducidos no válidos', 'Error de autentficación');
  }
  // Método para obtener los errores del campo si los necesitas
  get usuario() {
    return this.loginForm.get('usuario');
  }
  updateNotifMethod(notif: any) {
    // console.log(notif);
  }
}
