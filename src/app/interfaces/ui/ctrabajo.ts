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