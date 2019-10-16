import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class MensajesService {

  constructor(
	private toastr: ToastrService,
	private route: Router
  ) { }

	success(data: any) {
		this.toastr.success(data.message, data.title, {
			enableHtml :  true,
			positionClass: 'toast-top-full-width',
			progressBar: true,
			closeButton: true,
			onActivateTick: true
		});
		this.route.navigate(['panel-adm/unidadesAdmin/']);
	}

	warning(data: any) {
		this.toastr.warning(data.message, data.title, {
			enableHtml :  true,
			positionClass: 'toast-top-full-width',
			progressBar: true,
			closeButton: true,
			onActivateTick: true
		});
		// this.route.navigate(['panel-adm/unidadesAdmin/']);
	}

	danger(data: any) {
		this.toastr.error(data.message, data.title, {
			enableHtml :  true,
			positionClass: 'toast-top-full-width',
			progressBar: true,
			closeButton: true,
			onActivateTick: true
		});
		// this.route.navigate(['panel-adm/unidadesAdmin/']);
	}

}