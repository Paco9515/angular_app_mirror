import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from '../../common/services/shared/mensajes.service';
import { LoginService } from '../../common/services/login/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  recordar: boolean = false;

  constructor(
	private router: Router,
	private loginService: LoginService,
	private mensaje: MensajesService
	) {
   }

  ngOnInit() {
	this.username = localStorage.getItem('username') || '';
	if(this.username.length > 1) {
		this.recordar = true;
	}
  }

  ingresar(forma: NgForm) {
	if (forma.invalid) {
		return;
	}
	// console.log('ifo de acceso', this.user);
  	if (forma.value.username != null && forma.value.password != null) {
		if (forma.value.username != '' && forma.value.password != '') {			
			this.loginService.loginUser(forma.value)
			.subscribe((data: any) => {
				// console.log(data);
				if (data.status) {
					// console.log(data);
					this.mensaje.success(data);
					this.loginService.setUser(data.user);
					this.loginService.setToken(data.user.api_token);	
					if (this.recordar) {
						this.loginService.setUsername(data.user.username);
					} else {
						this.loginService.removeUsername();
					}					
					this.router.navigate([`/panel-adm/`]);
				} else {
					// console.log(data);
					this.mensaje.danger(data);
				}
			});
		} else {
		console.log('Escriba los datos de acceso.');
		}
	} else {
		console.log('Escriba los datos de acceso.');
	}
  }

}
