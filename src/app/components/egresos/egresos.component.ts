import { Component } from '@angular/core';

@Component({
	selector: 'app-egresos',
	templateUrl: './egresos.component.html',
	styles: []
})
export class EgresosComponent {

	// keys = [1, 2, 7];
	keys = [0, 0, 0];
	onData(data: any) {
		console.log('Desde el padre ', data);
	}

}
