export interface Proyectos {
	id?: string;
	id_empresa?: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	anio: string;
	cp: string;
	entidad: string;
	municipio: string;
	colonia: string;
	status: boolean;
}

export interface Fases {
	id?: string;
	id_proyecto?: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	status: boolean;
}