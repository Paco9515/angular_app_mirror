import { Component } from '@angular/core';
import { SubeconomiaService } from './../../../services/ca/subeconomia.service';
import { Subeconomias } from './../../../interfaces/ca/subeconomia';


@Component({
  selector: 'app-subeconomias',
  templateUrl: './subeconomias.component.html',
  styles: []
})
export class SubeconomiasComponent{

  subeconomias: Subeconomias[];

	constructor(
		private subeconomia_service: SubeconomiaService
	) {
		this.subeconomias = [];
		this.getSubeconomias();
	 }

	 getSubeconomias() {
		this.subeconomia_service.getSubeconomias()
			.subscribe((data: any) => {
				this.subeconomias = data;
			});
		}

}
