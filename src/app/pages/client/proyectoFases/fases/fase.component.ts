import { Component } from '@angular/core';
import { FaseService } from 'src/app/common/services/pe/fase.service';
import { ActivatedRoute } from '@angular/router';
import { Fases } from 'src/app/common/interfaces/pe.interface';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../../../common/services/shared/mensajes.service';

@Component({
	selector: 'app-fase',
	templateUrl: './fase.component.html'
})
export class FaseComponent {
	proyectos: any[];
	fase: Fases;
	colonias: any;

	constructor(
		private faseService: FaseService,
		private activatedRoute: ActivatedRoute,
		private mensaje: MensajesService
	) {
		this.fase = {
			id: '',
			id_proyecto: '',
			codigo: '',
			nombre: '',
			descripcion: '',
			externo: false,
			cp: '',
			entidad: '',
			municipio: '',
			colonia: '',
			status: false
		};

		this.faseService.getProyectos().subscribe((data: any) => {
			this.proyectos = data;
		});

		this.activatedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.getFase(data.id);
			}
		});
	}

	getFase(id: string) {
		this.faseService.getFase(id)
			.subscribe((obj: any) => {
				this.fase = obj.data;
				if (this.fase.externo) {
					this.getDireccion(this.fase.cp);
				}
			});
	}

	guardar(f: NgForm) {
		console.log(this.fase);

		if (f.valid) {
			this.faseService.createUpdateFase(this.fase)
				.subscribe((data: any) => {
					this.mensaje.success(data);
				}, error => {
					this.mensaje.danger(error.error);
				});
		}
	}


	getDireccion($cp) {
		if ($cp !== '') {
			this.faseService.getDireccionCP($cp)
				.subscribe((response: any) => {
					if (response.colonias !== [] && response.municipio !== ''  && response.estado !== '' ) {

						this.fase.entidad = response.estado;
						this.fase.municipio = response.municipio;
						this.colonias = response.colonias;

					} else {
						const MENSAJE: any = {
							'message': 'El codigo postal no es valido',
							'title': 'Advertencia'
						};
						this.mensaje.warning(MENSAJE);
					}
				});
		}
	}
}
