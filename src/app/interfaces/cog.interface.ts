export interface Capitulos {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
}

export interface Conceptos {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_capitulo?: string;
	nombre_capitulo?: string;
	id_gasto?: string;
	nombre_gasto?: string;
}

export interface Partidas {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_capitulo?: string;
	nombre_capitulo?: string;
	id_concepto?: string;
	nombre_concepto?: string;

}
