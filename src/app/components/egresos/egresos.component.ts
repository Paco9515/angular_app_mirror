import { Component } from '@angular/core';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	// keys = [1, 2, 7];
	keys = [2, 8, 30, false];
	cc = [1, 1, 1, 1, ];
	ca = [1, 1, 1, 1, 2];
	uikeys = [0, 0, 0];
	cfgkeys = [0, 0, 0];
	cffkeys = [0, 0, 0];

	onData(data: any) {
		console.log('Desde el padre ', data);
	}

	onDataCa(dataCa: any) {
		console.log('Desde el padre ', dataCa);
	}


	onUI(dataUI: any) {
		console.log('UI desde el padre ', dataUI);
	}


	onCFF(dataCFG: any) {
		console.log('CFG desde el padre ', dataCFG);
	}


	onCFG(dataCFF: any) {
		console.log('CFF desde el padre ', dataCFF);
	}

}
