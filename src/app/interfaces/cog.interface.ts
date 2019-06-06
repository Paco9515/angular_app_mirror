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
    id_capitulo: string;
  
}

export interface Partidas {
	id?: string;
	codigo: string;
	nombre: string;
    status: boolean;
    id_concepto: string;
}
