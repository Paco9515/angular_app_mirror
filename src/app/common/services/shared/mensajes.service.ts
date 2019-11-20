import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})

export class MensajesService {

  constructor(
	private toastr: ToastrService,
	private route: Router
  ) { }

	individualConfig: Partial<IndividualConfig> = {
		enableHtml :  true,
		positionClass: 'toast-top-full-width',
		progressBar: false,
		closeButton: true,
		onActivateTick: true
	};

	success(data: any, url?: string) {
		this.toastr.success(data.message, data.title, this.individualConfig);
		this.redirect( url );
	}

	warning(data: any, url?: string) {
		this.toastr.warning(data.message, data.title, this.individualConfig);
		this.redirect( url );
	}

	danger(data: any, url?: string) {
		this.toastr.error(data.message, data.title, this.individualConfig);
		this.redirect( url );
	}

	redirect( url: string ) {
		if (url) {
			return this.route.navigate([url]);
		}
	}

}