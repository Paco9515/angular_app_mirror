import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Grupos, Generos, Rubros, Cuentas } from '../../../interfaces/cc.interface';
import { CuentaService } from 'src/app/services/cc/cuenta.service';

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.component.html',
    styles: []
})

export class CuentaComponent implements OnInit {

    cuenta: Cuentas;
	rubros: Rubros;
	grupos: Grupos;
    generos: Generos;

    constructor(
		private cuentaService: CuentaService,
		private activitedRoute: ActivatedRoute
    ) {
        this.cuenta = {
            id: '',
            codigo: '',
            nombre: '',
            status: true,
            id_genero: '',
            nombre_genero: '',
            id_grupo: '',
            nombre_grupo: '',
            id_rubro: '',
            nombre_rubro: '',
        };

        this.cuentaService.getGeneros().subscribe((data: Generos) => {
            this.generos = data;
        });
        
        this.cuentaService.getGrupos().subscribe((obj: Grupos) => {
            this.grupos = obj;
        });

		this.cuentaService.getRubros().subscribe((obj: Rubros) => {
			this.rubros = obj;
		});
    }

    ngOnInit() {
        this.activitedRoute.params.subscribe((data: any) => {
            if (data.id !== 'nuevo') {
                this.cargarCuenta(data.id);
            }
        });
    }

	cargarCuenta(id: string) {
		this.cuentaService.getCuenta(id).subscribe((obj: any) => {
			this.cuenta = obj;
		});
	}

    guardar(f: NgForm) {
        if (f.valid) {
            this.cuentaService.createUpdateCuenta(this.cuenta)
                .subscribe((response: any) => {
                    console.log(response);
                },
                error => {
                    console.log(error.error);
                });
        }
    }

}
