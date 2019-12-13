export interface Proyectos {
	id?: string;
	id_presupuesto?: string;
	id_subprograma?: string;
	id_programa?: string;
	codigo?: string;
	nombre: string;
	descripcion: string;
	fecha_inicio: Date;
	fecha_final: Date;
	anio?: string;
	status: boolean;
	codigo_subprograma?: string;
	nombre_subprograma?: string;
	codigo_programa?: string;
	nombre_programa?: string;
}

export interface Fases {
	id?: string;
	id_proyecto?: string;
	id_tipo_financ?: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	externo: boolean;
	cp: string;
	entidad: string;
	municipio: string;
	colonia: string;
	status: boolean;
	partidas: PartidaFase[];
}

export interface PartidaFase {
	id?: string;
	id_partida: string;
	nombre_partida?: string;
	id_fase?: string;
	nombre_fase?: string;
}