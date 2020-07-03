import { Empresa } from '../../_model/empresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from '../../_services/consulta.service';
import { LoginService } from '../../_services/login.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Factura } from '../../_model/factura';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-contadores-facturas',
  templateUrl: './contadores-facturas.component.html',
  styleUrls: ['./contadores-facturas.component.css']
})
export class ContadoresFacturasComponent implements OnInit {
  public fecha: string = '';
  public fechaActual: string = '';
  public empresas: String[];
  public fecha_actual: string = 'null';
  public fecha_final: string = 'null';
  public usuario: string = 'null';
  public getList: Empresa[] = null;
  public contador:  Number =0.0;
  public total: Number = 0.0;
  public subtotal: Number = 0.0;
  selected = 'Empresa';
  dataSource: MatTableDataSource<Factura>;
  displayedColumns = ['codigo', 'fecha', 'total', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private consultaService: ConsultaService, public dialog: MatDialog, private loginServices: LoginService) { }
  ngOnInit(): void {
    this.cargaEmpresa();

  }
  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  cargaEmpresa() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    this.usuario = decodedToken.user_name;
  
    this.consultaService.consultaContadoresEmpresas(decodedToken.user_name).subscribe(data => {
      this.getList = data.map(x => x);
      this.empresas = data.map(x => x.nombreLocal);
      console.log(this.getList)
    });
  }

  getRuc(nombreLocal: String) {
    var axu = 'do';
    this.getList.map((x) => {
      if (x.nombreLocal == nombreLocal) {
        axu = x.ruc;
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
  
  onClickMe() {
     var axuTotal =0.0; 
    var axuSubTotal = 0.0; 
    var axu = 0; 
      if (this.getRuc(this.selected) != 'do') {
        if (this.fecha_actual != 'null' && this.fecha_final != 'null') {
        
          this.consultaService.consultaContadoresFacturas(this.getRuc(this.selected), this.fecha_actual, this.fecha_final).subscribe(data => {

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            data.map(x => {
              axuTotal = axuTotal+x.total;
              axuSubTotal = axuSubTotal+x.subTotal;
              
            });
            if (data!= null){
              this.subtotal = axuSubTotal;
              this.total = axuTotal;
              this.contador=data.length;
            }
          

          });
        } else {
          alert('Capo de fecha esta en blanco ')

        }
      } else {
        alert('Debe  Seleccionar una empresa ')
      }


     
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fecha_actual = event.value.getFullYear() + "-" + event.value.getMonth() + "-" + event.value.getDay();
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
    this.fecha_actual = event.value.getFullYear() + "-" + axuMonth + "-" + axuDay;
    console.log(this.fecha_actual);
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

  pdf(id: number, codigo: String) {
    this.consultaService.consultaPdfFactura(id).subscribe(x => {
      const url = window.URL.createObjectURL(x);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = `${codigo}.pdf`
      a.click();
    });
  }

}