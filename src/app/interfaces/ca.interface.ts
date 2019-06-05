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
}

export class Clas_administrativa {
    id?: string;
    codigo: string;
    nombre: string;
    status: boolean;
    id_subeconomia: string;
}

export class Economicas {
    id?: string;
    codigo: string;
    nombre: string;
    status: boolean;
    id_financiero: string;
}

export class Subeconomias {
    id?: string;
    codigo: string;
    nombre: string;
    status: boolean;
    id_economica: string;
}