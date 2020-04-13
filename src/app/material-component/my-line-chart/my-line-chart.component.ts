import { Tiempo } from './../../_model/tiempo';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Mapa } from '../../dashboard/mapa';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ConsultaService } from '../../_services/consulta.service';
declare const myTest: any;
 
@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit {
   public fecha: string = '';
 
  constructor(private consultaService: ConsultaService) { }

  ngOnInit() {
    
    this.getTiempo();
 
}

  public getTiempo() {
    this.consultaService.getTiempo().subscribe(data => {
 
      this.fecha = data[data.length - 1].fecha;
      myTest(data[data.length - 1].id);
      
    });
  }
 
}






