import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CffService } from 'src/app/services/cff/cff.service';
import { Fuente, Subfuente, Tipo } from 'src/app/interfaces/cff.interface';
// import { ConsoleReporter } from 'jasmine';

@Component({
	selector: 'app-cff',
	templateUrl: './cff.component.html',
	styles: []
})
export class CffComponent implements OnInit {

	@Input() primary_keys_cff: any;
	fuentes: Fuente[];
	subfuentes: Subfuente[];
	tipos: Tipo[];
	data: any;

	@Output() out = new EventEmitter<any>();

	constructor(
		private cff_service: CffService
	) {
		this.data = {
			id_fuente: '',
			id_subfuente: '',
			id_tipo: ''
		};
		this.out.emit(this.data);
	}

	ngOnInit() {
		this.cff_service.getFuentes()
			.subscribe((data: any) => {
				this.fuentes = data;
			});

		if (this.primary_keys_cff[0] !== '0') {
			this.onChangeFuente(this.primary_keys_cff[0]);
			this.onChangeSubfuente(this.primary_keys_cff[1]);
			this.onChangeTipo(this.primary_keys_cff[2]);
		} else {
			this.out.emit(this.data);
		}
	}

	onChangeFuente(id_fuente) {
		this.data.id_fuente = '';
		this.data.id_subfuente = '';
		this.subfuentes = [];
		this.tipos = [];
		if (id_fuente !== '') {
			this.data.id_fuente = id_fuente;
			this.cff_service.getSubsFuente(id_fuente)
				.subscribe((data: any) => {
					this.subfuentes = data;
				});
		}
	}

	onChangeSubfuente(id_subfuente) {
		this.data.id_tipo = '';
		this.tipos = [];
		if (id_subfuente !== '') {
			this.data.id_subfuente = id_subfuente;
			this.cff_service.getTiposSub(id_subfuente)
				.subscribe((data: any) => {
					this.tipos = data;
				});
		}
	}

	onChangeTipo(id_tipo) {
		this.data.id_tipo = id_tipo;
		this.out.emit(this.data);
	}
}
