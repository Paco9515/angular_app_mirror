import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CffService } from 'src/app/common/services/cff/cff.service';
import { Fuente, Subfuente, Tipo } from 'src/app/common/interfaces/cff.interface';
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
		this.restartVariables();
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

	restartVariables() {
		this.data = {
			id_fuente: '',
			id_subfuente: '',
			id_tipo: '',
			nombre_tipo: '',
		};
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

	onChangeTipo(args) {
		this.data.nombre_tipo = args.options[args.selectedIndex].innerText;
		this.data.id_tipo = args.value;
		this.out.emit(this.data);
	}
}
