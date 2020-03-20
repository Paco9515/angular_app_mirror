export interface Usuario {
	id?: string;
	nombre: string;
	username: string;
	password: string;
	email: string;
    api_token: string;
    id_nivel: string;
	nivel: string;
	id_cc: string;
	nombre_cc: string;
	img_name: string;
	status: boolean;
}

export interface Nivel {
	id: string,
	nivel:string
}

export interface Cc {
	id:string,
	nombre: string
}

