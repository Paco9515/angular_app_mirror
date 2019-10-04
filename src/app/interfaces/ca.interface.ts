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
	id_sector?: string;
	nombre_sector?: string;
	status_sector?: boolean;
}

export class Economias {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_financiero?: string;
	nombre_financiero?: string;
	status_financiero?: boolean;
	id_sector?: string;
	nombre_sector?: string;
	status_sector?: boolean;
}

export class Subeconomias {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_economia?: string;
	nombre_economia?: string;
	status_economia?: boolean;
	id_financiero?: string;
	nombre_financiero?: string;
	status_financiero?: boolean;
	id_sector?: string;
	nombre_sector?: string;
	status_sector?: boolean;
}

export class Clas_admin {
	id?: string;
	codigo: string;
	nombre: string;
	status: boolean;
	id_subeconomia?: string;
	nombre_subeconomia?: string;
	status_subeconomia?: boolean;
	id_economia?: string;
	nombre_economia?: string;
	status_economia?: boolean;
	id_financiero?: string;
	nombre_financiero?: string;
	status_financiero?: boolean;
	id_sector?: string;
	nombre_sector?: string;
	status_sector?: boolean;
}
