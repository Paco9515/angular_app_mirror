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
    id_genero: string;
    nombre_genero: string;
}

export class Rubros {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_genero?: string;
    nombre_genero?: string;
    id_grupo?: string;
    nombre_grupo?: string;
}

export class Cuentas {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_genero?: string;
    nombre_genero?: string;
    id_grupo?: string;
    nombre_grupo?: string;
    id_rubro: string;
    nombre_rubro?: string;
}

export class Subcuentas {
    id?: string;
    codigo: string;
    nombre: string;
    status: true;
    id_genero?: string;
    nombre_genero?: string;
    id_grupo?: string;
    nombre_grupo?: string;
    id_rubro?: string;
    nombre_rubro?: string;
    id_cuenta? : string;
    nombre_cuenta?: string;
}