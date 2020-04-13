import { PaisDTO } from './../_model/pais_dto';
import { Tiempo } from './../_model/tiempo';
 
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ProvinciaDTO } from '../_model/provincia_dto';
import { Contagios } from '../_model/contagios';
import { LineaDTO } from '../_model/LineaDTO';
 

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    url: string = `${environment.HOST}`;

    constructor(private http: HttpClient) { }

 
    consultarProvincia( ) {
        return this.http.get<ProvinciaDTO[]>(`${this.url}/Contagios/pro `);
    }
    getTiempo() {
        return this.http.get<Tiempo[]>(`${this.url}/tiempos`);
    }
    consultarProvinciaId(id:number) {
        return this.http.get<ProvinciaDTO[]>(`${this.url}/Contagios/pro/${id}`);
    }
    consultarPaisId(id: number) {
        return this.http.get<PaisDTO>(`${this.url}/Contagios/pais/${id}`);
    }
    consultarContagios( ) {
        return this.http.get<Contagios[]>(`${this.url}/Contagios`);
    }

    contagioLinea(nombre:String) {
        return this.http.get<LineaDTO[]>(`${this.url}/Contagios/linea/${nombre}`);
    }
}