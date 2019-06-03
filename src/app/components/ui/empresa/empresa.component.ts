import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Empresas } from "src/app/interfaces/ui/empresas";
import { EmpresaService } from "src/app/services/ui/empresa.service";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {

  	id: string;
	forma: FormGroup;
	// programa: Programas;

	constructor(
		private empresaService: EmpresaService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastrService: ToastrService
	) {
		this.forma = new FormGroup({
			nombre: new FormControl('', Validators.required)
		});
		this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
      console.log(data);
			if (this.id !== 'nuevo') {
				this.empresaService.getEmpresa(this.id)
					.subscribe((obj: Empresas) => {
						this.createForma(obj[0]);
            console.log(obj[0].id_tipo_empresa);
					});
			} else {
				this.createForma({
          id : '',
          id_info_gene: null,
          id_tipo_empresa: null,
          id_clas_administrativa: null,
          nombre: '',
          persona_moral: null,
          imss_sar:'',
          iste_foviste:'',
          reg_estatal : '',
          url_image :'',
      	  status: true
        });
				// this.programa = {nombre: '', status: true};
			}
		});
		// console.log('1');
	}

  ngOnInit() {
  }

  createForma(obj: Empresas) {
		this.forma = new FormGroup({
      id_tipo_emp: new FormControl(obj.id_tipo_empresa),
      id_clas_administrativa: new FormControl(obj.id_clas_administrativa),
      nombre: new FormControl(obj.nombre, Validators.required),
      persona_moral: new FormControl(obj.persona_moral),
      imss_sar:new FormControl(obj.imss_sar),
      isste_foviste:new FormControl(obj.iste_foviste),
      reg_estatal : new FormControl(obj.reg_estatal),
      url_image :new FormControl(obj.url_image),
      status: new FormControl(obj.status),
		});
	}

	guardar() {
		// this.toastrService.success('Programa creado correctamente.', '¡Éxito!');

		this.empresaService.createEmpresa(this.forma.value)
		.subscribe((response: any) => {
			if (response.message === 'creada') {
				console.log('Empresa creada con exito.');
			} else {
				console.log('Empresa editada con exito.');
			}
		});

	}

}
