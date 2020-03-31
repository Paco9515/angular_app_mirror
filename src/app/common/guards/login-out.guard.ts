import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginOutGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}
  canActivate() {
    const user = this.loginService.getCurrentUser();
    const token_storage = this.loginService.getTokenStorage();
    if (!user && !token_storage) {
  		return true;
  	} else {
      this.router.navigate(['/panel-adm/']);
      return false;
    }
  }
}
