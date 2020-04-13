import { Tiempo } from "./tiempo";
import { Canton } from "./Canton";

 
export class Contagios {
    id:              number;
    tiempo:          Tiempo;
    canton:          Canton;
    cerco:           number;
    casoConfirmado:  number;
    muerte:          number;
    recuperados:     number;
    aislamiento:     number;
    hospitalizacion: number;
    casoSospechoso:  number;
    muestra:         number;
    hosUrgen:        number;
}






