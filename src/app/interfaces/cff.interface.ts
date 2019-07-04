export interface Fuente {
    id?: string;
    codigo: string;
    nombre: string;
    status:boolean;
}  

export interface Subfuente {
    id?: string;
    id_fuente:number;
    codigo: string;
    nombre: string;
    status:boolean;
} 

export interface Tipo {
    id?: string;
    id_subfuente:number;
    codigo: string;
    nombre: string;
    anio:string;
    status:boolean;
}  