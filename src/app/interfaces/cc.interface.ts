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
    id_genero: string
}

export class Rubros {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_grupo: string
}

export class Cuentas {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_rubro: string
}

export class Subcuentas {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_cuenta: string
}