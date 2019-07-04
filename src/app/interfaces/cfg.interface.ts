export interface Finalidad {
    id?: string;
    codigo: string;
    nombre: string;
    status:boolean;
}  

export interface Funciones {
    id?: string;
    id_finalidad:number;
    codigo:string;
	nombre: string;
	status: boolean;
}

export interface Subfunciones {
    id?: string;
    id_funcion:number;
    codigo:string;
	nombre: string;
	status: boolean;
}