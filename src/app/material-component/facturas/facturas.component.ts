import { Empresa } from './../../_model/empresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from '../../_services/consulta.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Factura } from '../../_model/factura';

declare const carga: any;
@Component({
    selector: 'app-facturas',
    templateUrl: './facturas.component.html',
    styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
    public fecha: string = '';
    public fechaActual: string = '';
    public empresas: String[];
    public cedula: string = ''; 
    public fecha_actual: string = 'null'; 
    public fecha_final: string = 'null'; 
    public getList:Empresa[]=null; 
    selected = 'Empresa';
    dataSource: MatTableDataSource<Factura>;
    displayedColumns = ['codigo', 'fecha', 'total', 'acciones'];
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    
    constructor(private consultaService: ConsultaService, public dialog: MatDialog) { }
    ngOnInit(): void {
        this.cargaEmpresa(); 
        
    }
    filtrar(valor: string) {
        this.dataSource.filter = valor.trim().toLowerCase();
    }
    cargaEmpresa(){
        this.consultaService.consultaEmpresa().subscribe(data => {
           
            this.getList = data.map(x => x);
            this.empresas = data.map(x => x.nombre);
            console.log(this.getList)
        });
    }

    getRuc(nombre:String) {
      var  axu ='do'; 
        this.getList.map((x) => {
                 if (x.nombre == nombre){
                     axu= x.ruc;
                 }
            });
                return axu; 
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
        if (this.cedula.length == 10 || this.cedula.length == 13  ){
            return false; 
        }else{
            return true; 
        }
    }
    onClickMe(){
        if (!this._keyDat()){
            if (this.getRuc(this.selected) != 'do'  ){
                if (this.fecha_actual != 'null' && this.fecha_final != 'null'  ){
                    console.log(this.cedula + ' ' + this.getRuc(this.selected) + ' ' + this.fecha_actual + ' ' + this.fecha_final);
                    this.consultaService.consultaFacturas(this.cedula,this.getRuc(this.selected) , this.fecha_actual ,this.fecha_final).subscribe(data => {
                        this.dataSource = new MatTableDataSource(data);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                    });
                }else{
                    alert('Capo de fecha esta en blanco ') 

                }
            }else{
                alert('Debe  Seleccionar una empresa ') 
            }

            
        }else {
            alert('Debe tener al menos la cedula o ruc') 
        }
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.fecha_actual= event.value.getFullYear() + "-" + event.value.getMonth() + "-" + event.value.getDay() ;
         var axuMonth:String; 
         var axuDay:String;
         var intMonth:Number; 
         var intDay: Number; 
        if (event.value.getUTCMonth()+1 <10){
            intMonth = event.value.getUTCMonth() + 1; 
            axuMonth = 0 + '' + intMonth;
        }else{
            intMonth = event.value.getUTCMonth() + 1; 
            axuMonth = intMonth+'';
        }
        if (event.value.getUTCDate()  < 10) {
            axuDay = 0 + '' + event.value.getUTCDate() ;
        } else {
            axuDay = event.value.getUTCDate()  + '';
        }
        this.fecha_actual = event.value.getFullYear() + "-" + axuMonth + "-" + axuDay;
        console.log(this.fecha_actual );
    }
    addEventFin(type: string, event: MatDatepickerInputEvent<Date>) {
        this.fecha_final = event.value.getFullYear() + "-" + event.value.getMonth() + "-" + event.value.getDay();
        var axuMonth: String;
        var axuDay: String;
        var intMonth: Number;
        var intDay: Number;
        if (event.value.getUTCMonth() + 1 < 10) {
            intMonth = event.value.getUTCMonth() + 1;
            axuMonth = 0 + '' + intMonth;
        } else {
            intMonth = event.value.getUTCMonth() + 1;
            axuMonth = intMonth + '';
        }
        if (event.value.getUTCDate() < 10) {
            axuDay = 0 + '' + event.value.getUTCDate();
        } else {
            axuDay = event.value.getUTCDate() + '';
        }
        this.fecha_final = event.value.getFullYear() + "-" + axuMonth + "-" + axuDay;
        console.log(this.fecha_final);
    }

    pdf(id: number) {
       console.log(id)
    }
 
}
