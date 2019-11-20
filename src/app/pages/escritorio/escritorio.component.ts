import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

// import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
	selector: 'app-escritorio',
	templateUrl: './escritorio.component.html',
	styles: []
})
export class EscritorioComponent implements OnInit {

	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	// public barChartPlugins = [pluginDataLabels];
	public barChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 48], label: 'Series A' },
		{ data: [28, 48, 48, 19, 86, 27, 90], label: 'Series B' }
	  ];

	constructor() {
		// this.doughnutChartData = [
		// 	[350, 450, 100],
		// 	[50, 150, 120],
		// 	[250, 130, 70],
		// ];
		// this.doughnutChartType = 'doughnut';
		// this.doughnutChartLabels = [
		// 	'Download Sales', 'In-Store Sales', 'Mail-Order Sales'
		// ];
	}

	ngOnInit() {
	}

}
