import { Retencion } from './../_model/retencion';
import { Factura } from './../_model/factura';
import { PaisDTO } from './../_model/pais_dto';
import { Tiempo } from './../_model/tiempo';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ProvinciaDTO } from '../_model/provincia_dto';
import { Contagios } from '../_model/contagios';
import { LineaDTO } from '../_model/LineaDTO';
import { Empresa } from '../_model/empresa';
import { Catastro } from '../_model/Catastro';


@Injectable({
    providedIn: 'root'
})
export class CatastroService {

    url: string = `${environment.HOST}`;
    api: string = `${environment.API}`;
    constructor(private http: HttpClient) { }


    consultarCatastro() {
        return this.http.get<Catastro[]>(`${this.url}/catastro`);
    }

}
