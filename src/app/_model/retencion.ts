// Generated by https://quicktype.io

import { Empresa } from "./empresa";

export interface Retencion {
    id:            number;
    rucProvedor:   string;
    valor:         number;
    baseImponible: number;
    fecha:         string;
    codigo:        string;
    empresa:       Empresa;
}
 
