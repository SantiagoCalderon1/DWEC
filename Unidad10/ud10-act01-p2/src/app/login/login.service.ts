import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor() { }
  
  public username : string = 'santi';
  public password : string = 'santi';
  public identified: boolean = false;

  verifyUser(username : string, password : string) : boolean{
    this.identified = (username === this.username && password === this.password);
    return this.identified;
  }

  isIdentified() : boolean{
    return this.identified;
  }

  exitApp() : void {
    this.identified = false;
  }

}
