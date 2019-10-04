export class Generos {
	id?: string;
	codigo: string;
	nombre: string;
	status: true;
}

export class Grupos {
	id?: string;
	codigo: string;
	nombre: string;
	status: true;
	id_genero?: string;
	nombre_genero?: string;
	status_genero?: boolean;
}

export class Rubros {
	id?: string;
	codigo: string;
	nombre: string;
	status: true;
	id_genero?: string;
	nombre_genero?: string;
	status_genero?: boolean;
	id_grupo?: string;
	nombre_grupo?: string;
	status_grupo?: boolean;
}

export class Cuentas {
	id?: string;
	codigo: string;
	nombre: string;
	status: true;
	id_genero?: string;
	nombre_genero?: string;
	status_genero?: boolean;
	id_grupo?: string;
	nombre_grupo?: string;
	status_grupo?: boolean;
	id_rubro: string;
	nombre_rubro?: string;
	status_rubro?: boolean;
}

export class Subcuentas {
	id?: string;
	codigo: string;
	nombre: string;
	status: true;
	id_genero?: string;
	nombre_genero?: string;
	status_genero?: boolean;
	id_grupo?: string;
	nombre_grupo?: string;
	status_grupo?: boolean;
	id_rubro?: string;
	nombre_rubro?: string;
	status_rubro?: boolean;
	id_cuenta?: string;
	nombre_cuenta?: string;
	status_cuenta?: boolean;
}