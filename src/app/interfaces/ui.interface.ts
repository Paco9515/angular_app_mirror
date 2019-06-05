export interface Empresas {
    id?: string;
    id_tipo_empresa?: number;
    id_clas_administrativa?: number;
    nombre: string;
    nom_comercial: string;
    persona_moral:number;
    imss_sar?:string;
    isste_foviste?:string;
    reg_estatal?:string;
    url_image?:string;
    status: boolean;
    id_info?: string;    
    estado: string;
    municipio: string;
    localidad: string;
    cp:number;
    colonia:string;
    calle:string;
    num_exterior:number;
    dom_interior?:string;
    num_interior?:string;
    telefono:number;
    correo:string;
    rfc:string;
	curp: string;
} 



export interface UnidadesAdmin {
    id?: string;
    id_empresa?: string;
    codigo: string;
    nombre: string;
    desc: string;
    status?:boolean;
}    

export interface Ccosto {
    id?: string;
    id_unidad_adm: number;
    id_subfuncion: number;
    codigo: string;
    nombre: string;
    status:boolean;
}  

export interface Ctrabajo {
    id?: string;
    id_centro_costo: number;
    codigo: string;
    nombre: string;
    estado: string;
    municipio: string;
    localidad: string;
    cp: string;
    colonia: string;
    calle: string;
    num_exterior: string;
    dom_interior?: string;
    num_interior?: string;
    status:boolean;
} 