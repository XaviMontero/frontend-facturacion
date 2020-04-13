import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../_services/consulta.service';
declare const carga: any;
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit{
  public fecha: string = '';
  public fechaActual: string = '';
  constructor(private consultaService: ConsultaService) { }
  ngOnInit(): void {

    this.getTiempo();
    

  }

  public getTiempo() {
    this.consultaService.getTiempo().subscribe(data => {

      this.fecha = data[data.length - 1].fecha;
      this.fechaActual = data[data.length - 6].fecha;
      carga(data[data.length - 1].id, data[data.length - 6].id);

    });
  }
}
