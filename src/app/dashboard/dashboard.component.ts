import { Empresa } from '../_model/empresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from '../_services/consulta.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Factura } from '../_model/factura';
import { Catastro } from '../_model/Catastro';
import { CatastroService } from '../_services/catastro.service';

declare const carga: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public fecha: string = '';
    public fechaActual: string = '';
    public empresas: String[];
    public clave: string = '';
    public fecha_actual: string = 'null';
    public fecha_final: string = 'null';
    public getList: Catastro[] = null;
    public isData = false;
    public nombresCompletos : string = '';
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


	constructor(private catastroService: CatastroService, public dialog: MatDialog) { }
	ngOnInit(): void {
    this.catastroService.consultarCatastro().subscribe (
      resp => {
        this.getList = resp;
      }
    );
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
		if (!this._keyDat()) {
        this.getList.forEach( data => {
          if (data.cedula.endsWith(this.clave)){
            console.log(data);
            this.nombresCompletos = data.nombre +' '+ data.apellido;
            this.isData = true;
          }
        });
		} else {

		}
	}






}
