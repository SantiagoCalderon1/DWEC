import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title: string = 'ejemplo01N';
  constructor(private _loginService: LoginService) {}
  estaIdentificado(): boolean {
    return this._loginService.estaIdentificado();
  }
}
