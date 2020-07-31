import { Component } from '@angular/core';
import { CcostoService } from 'src/app/common/services/ui/ccosto.service';
import { Ccosto } from 'src/app/common/interfaces/ui.interface';
import { EmpresaService } from 'src/app/common/services/ui/empresa.service';
import { MensajesService } from 'src/app/common/services/shared/mensajes.service';
import { UsuariosService } from '../../../../common/services/usuario/usuarios.service';


@Component({
  selector: 'app-ccostos',
  templateUrl: './ccostos.component.html',
  styles: []
})
export class CcostosComponent {

	ccostos: Ccosto[];
	detalle: any;
	user: any;
	nivel: any;
	empresa: string;
	banderaAdmin: boolean;
	empresas: any;
	responsable: any = [];
	banderaResp: boolean = false;
	banderaMostrarTitular: boolean;
	disCrear: boolean;
	disCrear2: boolean;
	// boton: boolean; // Bandera para bloqueael boton que permite cambiar al responsable de hacer ley si el usuario logueado no es el responsable

  	constructor(
		private ccosto_service: CcostoService,
		private empresaService: EmpresaService,
		private usuarioService: UsuariosService,
		private mensaje: MensajesService
	) {
		this.ccostos = [];
		this.detalle = {
			id: '',
			id_unidad_adm: '',
			nom_area: '',
			id_subfuncion: '',
			codigo_subfuncion: '',
			nom_subfuncion: '',
			codigo: '',
			nombre: '',
			status: true
		};
		this.nivel = null;    
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.user = user;
		this.nivel = user.id_nivel;
		this.empresa = user.id_empresa;

		this.inicio();
		
	}

	
	

	inicio() {
		this.ccosto_service.getResponsable().subscribe((centro: any) => {
			console.log('1', centro.id);
			console.log('2', this.user.id_cc);
			this.responsable = centro;

			if(this.nivel == null || this.nivel == 1 ) {//centro.id != this.user.id_cc) {
				this.banderaResp = true;
				this.banderaMostrarTitular = true;				
			} else {
				this.banderaResp = false;
				this.banderaMostrarTitular = false;
			}
			/* if(centro.id != this.user.id_cc) {
				this.boton = true;
			} else {
				this.boton = false;
			} */
		});
		
		let info = {
			id_cc_seleccionado: 'nuevo',
			id_cc_seleccionador: this.user.id_cc
		}
		this.ccosto_service.getUnidadesCcClient(info).subscribe((unidad: any) => {
			// console.log('unidad', unidad);
			if(unidad.length == 0) {
				this.disCrear = true;
			} else {
				this.disCrear = false;
			}
			// this.ccosto.id_unidad_adm = unidad[0].id;
		});

		let info2 = {
			id_cc_a_modificar: 'nuevo',
			id_cc_modificador: this.user.id_cc
		}
		this.usuarioService.getUsersDisponiblesByEmpresa(info2).subscribe((usuarios: any) => {
			// console.log('usuarios', usuarios);
			if(usuarios.length == 0) {
				this.disCrear2 = true;
			} else {
				this.disCrear2 = false;
			}
			// this.ccosto.id_unidad_adm = unidad[0].id;
		});

		/* if(this.nivel == null || this.nivel == 1) {
			this.banderaResp = true;
			this.banderaMostrarTitular = true;
		} else {
			this.banderaResp = false;
			this.banderaMostrarTitular = false;
		} */


		if (this.nivel != null) {
				this.banderaAdmin = false;	
				this.getCcostosHijos();					
		} else {
			this.banderaAdmin = true;	
			this.empresaService.getEmpresas().subscribe((data: any) => {
				this.empresas = data;
				// console.log('empresas' ,this.empresas);
				this.getCcostos(this.empresas[0].id);
			});		
		} 
	}

    getCcostosHijos() {
		this.ccosto_service.getCentrosCostoHijos(this.user.id)
			.subscribe((data: any) => {
				this.ccostos = data.data;
				// console.log('hijos: ', data);
			});
	}

	getCcostos(id_empresa: string) {
		this.ccosto_service.getCcostos(id_empresa)
			.subscribe((data: any) => {
				this.ccostos = data;
				// console.log('Constructor: ', this.ccostos);
			});
	}

	info(ccosto: any) {
		this.ccosto_service.getDetalleCc(ccosto.id).subscribe((detalle_cc: any) => {
			// console.log('detalle cc', detalle_cc);
			this.detalle = detalle_cc;
		});
	}

	eliminarActivar(id: string, bandera: boolean) {
		// this.programas = (this.programas.filter(data => data.id === id));
		this.ccosto_service.eliminarCcosto(id, bandera)
			.subscribe((response: any) => {
				this.mensaje.success(response);
				this.inicio();
			});
	}

}