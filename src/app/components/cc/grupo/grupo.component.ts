import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos, Generos } from 'src/app/interfaces/cc.interface';
import { GrupoService } from 'src/app/services/cc/grupo.service';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent {

	grupo: Grupos;
	generos: Generos;

	constructor(
		private activitedRoute: ActivatedRoute,
		private router: Router,
		private grupoService: GrupoService) {
		this.grupo = {
			id: '',
			codigo: '',
			nombre: '',
			status: true,
			id_genero: '',
			nombre_genero: ''
		};

		this.activitedRoute.params.subscribe((data: any) => {
			if (data.id !== 'nuevo') {
				this.cargarGrupo(data.id);
			}
		});

		this.grupoService.getGeneros()
			.subscribe((data: Generos) => {
			this.generos = data;
		});
	}

	cargarGrupo(id: string) {
		this.grupoService.getGrupo(id)
			.subscribe((obj: any) => {
				this.grupo = obj.data;
			},
			error => {
				this.router.navigate(['panel-adm/grupos']);
				alert(error.error.messaje);
			});
	}

	guardar(f: NgForm) {
		console.log(f);
		if (f.valid) {
			this.grupoService.createUpdateGrupo(this.grupo)
				.subscribe((response: any) => {
					console.log(response);
				}, error => {
					console.log(error.error);
			});
		}
	}


}
