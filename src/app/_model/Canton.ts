import { Provincia } from "./Provincia";

export interface Canton {
    id: number;
    nombre: string;
    provincia: Provincia;
    poblacion: number;
    longitud: number;
    latitud: number;
}