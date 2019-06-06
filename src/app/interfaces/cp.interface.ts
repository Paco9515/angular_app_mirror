export interface Programas {
	id?: string;
	nombre: string;
	status: boolean;
}

export interface Subprograma {
	id?: string;
	id_programa?: string;
	nombre_programa?: string;
	codigo: string;
	nombre: string;
	status: boolean;
}