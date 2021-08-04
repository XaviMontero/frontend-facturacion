import { Empresa } from '../_model/empresa';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from '../_services/consulta.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Catastro } from '../_model/Catastro';
import { CatastroService } from '../_services/catastro.service';
import { environment } from '../../environments/environment';
import * as mapboxgl from "mapbox-gl"
declare const carga: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,AfterViewInit{
    mapbox = (mapboxgl as typeof mapboxgl);
    public fecha: string = '';
    public fechaActual: string = '';
    public empresas: String[];
    public clave: string = '';
    public fecha_actual: string = 'null';
    public fecha_final: string = 'null';
    public getList: Catastro[] = null;
    public isData = false;
    public nombresCompletos : string = '';
    public observacion : string = '';
    public impuesto: string = '';
    public bomberos: string = '';
    public total: string = '';
    mapa: mapboxgl.Map;


	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  mapContainer:HTMLElement;

	constructor(private catastroService: CatastroService, public dialog: MatDialog) {

    this.mapbox.accessToken = environment.MAPBOX;
  }
	ngOnInit(): void {
    this.catastroService.consultarCatastro().subscribe (
      resp => {
        this.getList = resp;
      }
    );


	}
  ngAfterViewInit() {
    this.mapContainer = (<HTMLElement>document.getElementById('mapBox'));
    console.error( this.mapContainer)
    this.mapa = new mapboxgl.Map({
      container: this.mapContainer, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position
      zoom: 9 // starting zoom
      });
      this.mapa.addControl(new mapboxgl.NavigationControl());
}


	_keyUp(event: any) {
		const pattern = /[0-9\+\-\ ]/;
		let inputChar = String.fromCharCode(event.charCode);

		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}

	_keyDat(){
		if (this.clave.length <= 10) {
			return false;
		} else {
			return true;
		}
	}

	onClickMe(){
    let suma = 0;
		if (!this._keyDat()) {
        this.getList.forEach( data => {
          if (data.cedula.endsWith(this.clave)){
            console.log(data);
            this.nombresCompletos = data.nombre +' '+ data.apellido;
            this.observacion = data.observacion;
            this.impuesto = data.impuesto.toString();
            this.bomberos = data.bomberos.toString();
            suma= data.bomberos + data.impuesto;
            this.total = suma.toFixed(2).toString();
            this.isData = true;
          }
        });
		} else {

		}
	}






}
