import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RubroService } from 'src/app/services/cc/rubro.service';
import { Grupos, Generos, Rubros } from '../../../interfaces/cc.interface';

@Component({
	selector: 'app-rubro',
	templateUrl: './rubro.component.html',
	styles: []
})
export class RubroComponent implements OnInit {
	rubro: Rubros;
	grupos: Grupos[];
	generos: Generos[];

	constructor(
		private rubroService: RubroService,
		private activitedRoute: ActivatedRoute
	) {
		this.rubro = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: '',
			id_grupo: '',
			nombre_grupo: ''
		};
	}

	ngOnInit() {
		this.rubroService.getGeneros()
			.subscribe((data: any) => {
				this.generos = data;
			});

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarRubro(data.id);
			}
		});
	}

	cargarRubro(id: string) {
		this.rubroService.getRubro(id)
			.subscribe((obj: Rubros) => {
				this.rubro = obj;
				const GRUPO = this.rubro.id_grupo;
				this.onChangeGenero(this.rubro.id_genero);
				this.onChangeGrupo(GRUPO);
			});
	}

	onChangeGenero(id_genero) {
		this.rubro.id_grupo = '';
		this.grupos = [];
		if (id_genero !== '') {
			this.rubro.id_genero = id_genero;
			this.rubroService.getGruposGenero(id_genero)
				.subscribe((obj: any) => {
	                this.grupos = obj;
	        	});
		}
	}
	onChangeGrupo(id_grupo) {
		this.rubro.id_grupo = id_grupo;
	}

	guardar(f: NgForm) {
		if (f.valid) {
			this.rubroService.createUpdateRubro(this.rubro).subscribe(
				(response: any) => {
					console.log(response);
				},
				error => {
					console.log(error.error);
				}
			);
		}
	}
}
