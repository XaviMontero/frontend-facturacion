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
 

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    url: string = `${environment.HOST}`;
    api: string = `${environment.API}`;
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

    
    consultaEmpresa(){
        return this.http.get<Empresa[]>(`${this.api}/empresas`);
    }

    consultaFacturas(identificacion:String, ruc:String, fechaInico:String, fechaFin:String) {
        return this.http.get<Factura[]>(`${this.api}/facturas/${identificacion}/${ruc}/${fechaInico}/${fechaFin}`);
    }
    consultaRetencion(identificacion: String, ruc: String, fechaInico: String, fechaFin: String) {
        return this.http.get<Retencion[]>(`${this.api}/retenciones/${identificacion}/${ruc}/${fechaInico}/${fechaFin}`);
    }
    consultaPdfFactura(identificacion: number) {
        return this.http.get(`${this.api}/facturas/generarPdf/${identificacion}`, {
            responseType: 'blob'
        });
    }
    consultaPdfRetencion(identificacion: number) {
        return this.http.get(`${this.api}/retenciones/generarPdf/${identificacion}`, {
            responseType: 'blob'
        });
    }
}