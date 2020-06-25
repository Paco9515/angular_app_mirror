export interface Infos {
	id?: string;
	nombre: string;
	id_ubicacion: string;
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
	id_empresa?: string;
	id_clas_administrativa: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	status?: boolean;
}

export interface Area {
	id_area?: string;	
	codigo: string;
	nom_area: string;
	id_unidad_adm: string;
	nom_unidad: string;
	id_empresa: string;
}

export interface Ccosto {
	id?: string;
	id_ubicacion_geografica: string;
	id_unidad_adm: string;
	codigo_unidad: string;
	nom_unidad: string;
	id_subfuncion: string;
	id_nivel: string;
	id_padre: string;
	codigo: string;
	nombre: string;
	calle: string;
	num_exterior: string;
	num_interior: string;
	longitud: string;
	latitud: string;
	oficina_unidad: boolean;
	responsable_ley: boolean;
	status: boolean;
	id_empresa: string;
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