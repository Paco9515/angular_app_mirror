export interface Empresas {
    id?: string;
    id_info_gene?: number;
    id_tipo_empresa?: number;
    id_clas_administrativa?: number;
    nombre: string;
    persona_moral:number;
    imss_sar?:string;
    iste_foviste?:string;
    reg_estatal?:string;
    url_image:string;
	status: boolean;
}    