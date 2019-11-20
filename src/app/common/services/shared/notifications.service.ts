import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})

export class NotificationsServices {

	constructor(
		private toastr: ToastrService,
		private route: Router
	) {}

	individualConfig: Partial<IndividualConfig> = {
		enableHtml :  true,
		positionClass: 'toast-top-full-width',
		progressBar: false,
		closeButton: true,
		onActivateTick: true
	};

	show(message: string, title: string, type: string, url?: string) {
		this.toastr.show(
			message,                // message
			title,                     // title
			this.individualConfig,  // IndividualConfig or GlobalConfig
			type                    // 'toast-success', 'toast-error', 'toast-warning' or 'toast-info'
		);
		if (url) {
			this.route.navigate([url]);
		}
  	}
}
