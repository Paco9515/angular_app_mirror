import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
// import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { 
  }
  canActivate() {
    
    const user = this.loginService.getCurrentUser(); 
    // console.log('x', user);
    
    if (user.id_nivel != 6) {   
      return true;     
    } else {
      this.router.navigate(['/panel-adm']);
      return false;      
    }
  } 
}