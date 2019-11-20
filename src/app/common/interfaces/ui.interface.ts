export interface Infos {
	id?: string;
	nombre: string;
	estado: string;
	municipio: string;
	localidad: string;
	cp: string;
	colonia: string;
	calle: string;
	num_exterior: string;
	dom_interior?: string;
	num_interior?: string;
	telefono: string;
	correo: string;
	rfc: string;
	curp: string;
}
export interface Empresas {
	id?: string;
	id_info_gene?: string;
	id_tipo_empresa: string;
	id_clas_administrativa: string;
	nom_comercial: string;
	persona_moral: string;
	imss_sar?: string;
	isste_foviste?: string;
	reg_estatal?: string;
	url_img?: string;
	status: boolean;
}

export interface InfoEmpresa {
	nombre: string;
	nom_comercial: string;
	estado: string;
	municipio: string;
	localidad: string;
	cp: string;
	colonia: string;
	calle: string;
	num_exterior: string;
	dom_interior?: string;
	num_interior?: string;
	telefono: string;
	correo: string;
	rfc: string;
	curp: string;
	id_tipo_empresa: string;
	id_clas_administrativa: string;
	persona_moral: string;
	imss_sar?: string;
	isste_foviste?: string;
	reg_estatal?: string;
	url_img?: string;
	status: boolean;
}

export interface UnidadesAdmin {
	id?: string;
	id_empresa?: any;
	codigo: number;
	nombre: string;
	descripcion: string;
	status?: boolean;
}

export interface Ccosto {
	id?: string;
	id_unidad_adm: string;
	id_subfuncion: string;
	id_nivel: string;
	codigo: string;
	nombre: string;
	status: boolean;
}

export interface Ctrabajo {
	id?: string;
	id_centro_costo?: string;
	codigo?: string;
	nombre: string;
	estado: string;
	municipio: string;
	localidad: string;
	cp: string;
	colonia: string;
	calle: string;
	num_exterior: string;
	dom_interior?: string;
	num_interior?: string;
	status: boolean;
}