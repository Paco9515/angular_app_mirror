export class Sectores {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
}

export class Financieros {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_sector: string;
	nombre_sector: string;
}

export class Economias {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_financiero?: string;
	nombre_financiero?: string;
	id_sector?: string;
	nombre_sector?: string;
}

export class Subeconomias {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_economia?: string;
	nombre_economia?: string;
	id_financiero?: string;
	nombre_financiero?: string;
	id_sector?: string;
	nombre_sector?: string;
}
export class Clas_admin {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_subeconomia?: string;
	nombre_subeconomia?: string;
	id_economia?: string;
	nombre_economia?: string;
	id_financiero?: string;
	nombre_financiero?: string;
	id_sector?: string;
	nombre_sector?: string;
}
