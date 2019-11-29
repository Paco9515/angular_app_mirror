export interface Proyectos {
	id?: string;
	id_centro_costo?: string;
	id_subprograma?: string;
	id_unidad_admin?: string;
	id_programa?: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	anio: number;
	fecha_inicio: Date;
	fecha_final: Date;
	status: boolean;
	codigo_subprograma?: string;
	nombre_subprograma?: string;
	codigo_programa?: string;
	nombre_programa?: string;
	codigo_centro_costo?: string;
	nombre_centro_costo?: string;
	codigo_unidad_admin?: string;
	nombre_unidad_admin?: string;
}

export interface Fases {
	id?: string;
	id_proyecto?: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	externo: boolean;
	cp: string;
	entidad: string;
	municipio: string;
	colonia: string;
	status: boolean;
}