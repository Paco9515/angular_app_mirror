export interface Infos{
    id?: string; 
    nombre:string;   
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
export interface Empresas {
    id?: string;
    id_info_gene?:number;
    id_tipo_empresa: number;
    id_clas_administrativa: number;
    nom_comercial: string;
    persona_moral:number;
    imss_sar?:string;
    isste_foviste?:string;
    reg_estatal?:string;
    url_img?:string;
    status: boolean;    
} 

export interface InfoEmpresa{
    nombre:string;  
    nom_comercial: string; 
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
    id_tipo_empresa: number;
    id_clas_administrativa: number;    
    persona_moral:number;
    imss_sar?:string;
    isste_foviste?:string;
    reg_estatal?:string;
    url_img?:string;
    status: boolean;
}



export interface UnidadesAdmin {
    id?: string;
    id_empresa?: any;
    codigo: number;
    nombre: string;
    desc: string;
    status?:boolean;
}    

export interface Ccosto {
    id?: string;
    id_unidad_adm: string;
    id_subfuncion: string;
    id_nivel: string;
    codigo: string;
    nombre: string;
    status: boolean;
}  

export interface Ctrabajo {
    id?: string;
    id_centro_costo?: string;
    codigo?: string;
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