import { LineaDTO } from './../_model/LineaDTO';
import { Contagios } from './../_model/contagios';
import { PaisDTO } from './../_model/pais_dto';
import { Tiempo } from './../_model/tiempo';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { ConsultaService } from '../_services/consulta.service';

import { environment } from '../../environments/environment';
import { Mapa } from './mapa';
import { Subject } from 'rxjs';
import { Customers } from '../_model/products';
import { process, State } from '@progress/kendo-data-query';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {
	GridComponent,
	GridDataResult,
	DataStateChangeEvent
} from '@progress/kendo-angular-grid';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	title = 'covid-frontend';
 
	selected = 'AZUAY';

	public barChartOptions: ChartOptions = {
		responsive: true,
		rotation: 90,

		// We use these empty structures as placeholders for dynamic theming.
		scales: { xAxes: [{}], yAxes: [{}] },
		plugins: {
			datalabels: {
				anchor: 'end',
				align: 'end',
			}
		}


	};
	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: ChartType = 'horizontalBar';
	public barChartLegend = true;
	public barChartPlugins = [pluginDataLabels];
	public valores: number[];
	public contagio: Contagios[]=[];
	public tiempos: Tiempo[]  ;
	public nombreProvinciass: String[];
	public fecha:string= ''; 
	public fechaTotales: string = ''; 
	public paises:PaisDTO; 
	public muertos: number; 
	public contagios: number; 
	public recuperados : number; 
	public maximoFechas:number=1; 
	public barChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40] }
	];

	constructor(private consultaService: ConsultaService) {

		this.consultaService.consultarContagios().subscribe(
			response => {
				this.contagio = response;
		 
			}, error => {



			}
		);
		this.gridData = process(this.contagio, this.state);
	 }

	ngOnInit() {

	 
		this.getTiempo(); 
		this.dibujar();
		this.cargaDeGraficaDos(); 
		this.pushOne();
	}

	cargaDeGraficaDos(){
		this.consultaService.consultarProvincia().subscribe(data => {
		 
			this.nombreProvinciass = data.map(x => x.nombreProvincia);
			 
		});
	}
	public getTiempo( ) {
		this.consultaService.getTiempo().subscribe(data => {
			this.tiempos = data;
			this.maximoFechas = data.length; 
			console.log(data.length);
			this.fecha =data [data.length-1].fecha;
			this.fechaTotales = data[data.length - 1].fecha;
			this.consultaService.consultarPaisId(data[data.length - 1].id).subscribe(r => {
					this.muertos = r.muertos; 
					this.recuperados= r.recuperados; 
					this.contagios = r.contagiados; 
				
			})	;
		
		});
	 
	}
	public dibujar() {
		this.consultaService.consultarProvincia().subscribe(data => {
			let cantidades = data.map(x => x.total);
			this.valores = cantidades;
			let nombres = data.map(x => x.nombreProvincia);
			console.log(nombres);
			this.barChartLabels = nombres;
			this.barChartData = [{
				data: cantidades, label: "Contagios",
				backgroundColor: 'rgba(0, 119, 204, 0.8)'
			}];
		});
	}
	// events
	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	}

	public randomize(): void {
		// Only Change 3 values
		const data = [
			Math.round(Math.random() * 100),
			59,
			80,
			(Math.random() * 100),
			56,
			(Math.random() * 100),
			40];

	}

	 pitchPais (event: any) {
 
			if (this.tiempos != undefined){
				this.tiempos.map(x =>{
					if (x.id == event.value){
						this.consultaService.consultarPaisId(x.id).subscribe(r => {
							this.muertos = r.muertos;
							this.recuperados = r.recuperados;
							this.contagios = r.contagiados;
						});
						this.fechaTotales = x.fecha; 
					}
				} );
			}
		
	}

	pitch(event: any){
		if (this.tiempos != undefined) {
			this.tiempos.map(x => {
				if (x.id == event.value) {
					this.consultaService.consultarProvinciaId(event.value).subscribe(data => {
						let cantidades = data.map(x => x.total);
						this.valores = cantidades;
						let nombres = data.map(x => x.nombreProvincia);
						console.log(nombres);
						this.barChartLabels = nombres;
						this.barChartData = [{
							data: cantidades, label: "Contagios",
							backgroundColor: 'rgba(0, 119, 204, 0.8)'
						}];
					});
					this.fecha = x.fecha;
				}
			});
		}
	}
 
	public state: State = {
		skip: 0,
		take: 20,

		// Initial filter descriptor
		filter: {
			logic: 'and',
			filters: [{ field: 'contagio.Canton.nombre', operator: 'contains', value: '' }]
		}
	};




	public gridData: GridDataResult = process(this.contagio, this.state);

	public dataStateChange(state: DataStateChangeEvent): void {
		this.state = state;
		this.gridData = process(this.contagio, this.state);
	}





	public lineChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
 
	 
	];
	public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartOptions: (ChartOptions & { annotation: any }) = {
		responsive: true,
		scales: {
			// We use this empty structure as a placeholder for dynamic theming.
			xAxes: [{}],
			yAxes: [
				{
					id: 'y-axis-0',
					position: 'left',
				},
				{
					id: 'y-axis-1',
					position: 'right',
					gridLines: {
						color: 'rgba(255,0,0,0.3)',
					},
					ticks: {
						fontColor: 'red',
					}
				}
			]
		},
		annotation: {
			annotations: [
				{
					type: 'line',
					mode: 'vertical',
					scaleID: 'x-axis-0',
					value: 'March',
					borderColor: 'orange',
					borderWidth: 2,
					label: {
						enabled: true,
						fontColor: 'orange',
						content: 'LineAnno'
					}
				},
			],
		},
	};
	public lineChartColors: Color[] = [
		{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // dark grey
			backgroundColor: 'rgba(77,83,96,0.2)',
			borderColor: 'rgba(77,83,96,1)',
			pointBackgroundColor: 'rgba(77,83,96,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(77,83,96,1)'
		},
		{ // red
			backgroundColor: 'rgba(255,0,0,0.3)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [pluginAnnotations];


	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

 
	 
	private generateNumber(i: number) {
		return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
	}

	// events
 
	public hideOne() {
		const isHidden = this.chart.isDatasetHidden(1);
		this.chart.hideDataset(1, !isHidden);
	}

	public pushOne() {
		this.consultaService.contagioLinea(this.selected).subscribe(data => {
			this.lineChartLabels = data.map(x => x.fecha);

			this.lineChartData= [{
				data: data.map(x => x.casos), label: this.selected,
				backgroundColor: 'rgba(0, 119, 204, 0.8)'
			}];
		   
		});

		this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
	}

	public changeColor() {
		this.lineChartColors[2].borderColor = 'green';
		this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
	}

	public changeLabel() {
		this.lineChartLabels[2] = ['1st Line', '2nd Line'];
		// this.chart.update();
	}

 }



