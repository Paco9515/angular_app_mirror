import { Component } from '@angular/core';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	// keys = [1, 2, 7];
	keys = [0, 0, 0];
	cc = [1, 1, 1, 1, 2];
	ca = [1, 1, 1, 1, 2];

	onData(data: any) {
		console.log('Desde el padre ', data);
	}

	onDataCc(dataCc: any) {
		console.log('Desde el padre ', dataCc);
	}
	onDataCa(dataCa: any) {
		console.log('Desde el padre ', dataCa);
	}

	uikeys = [0, 0, 0];
	onUI(dataUI: any) {
		console.log('UI desde el padre ', dataUI);
	}

	cfgkeys = [0, 0, 0];
	onCFF(dataCFG: any) {
		console.log('CFG desde el padre ', dataCFG);
	}

	cffkeys = [0, 0, 0];
	onCFG(dataCFF: any) {
		console.log('CFF desde el padre ', dataCFF);
	}

}
