export interface Usuario {
	id?: string;
	nombre: string;
	username: string;
	password: string;
	email: string;
    api_token: string;
    id_nivel: string;
	nivel: string;
	nombre_cc: string;
	id_emp: string;
	img_name: string;
	status: boolean;
}

export interface Nivel {
	id: string;
	id_empresa: string;
	id_nom_nivel_user: string;
	nivel_user: string;
	nombre_nivel:string;
}

export interface Cc {
	id:string,
	nombre: string
}

