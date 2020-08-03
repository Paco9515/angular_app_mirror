import { Component, Input } from '@angular/core';
import { estadosEgresos } from '../../constants/estadosEgresos';
import { estadosProyecto } from 'src/app/constants/estadoProyecto';


@Component({
	selector: 'app-badge-estado',
	template: `
		<span [class]="getBadgeFormatEstado()">
			{{ estado }}
    	</span>
    `,
})
export class BadgeEstadoComponent {

	@Input() estado: string;

	constructor() { }

	getBadgeFormatEstado() {
		switch (this.estado) {
			case estadosEgresos.CAPTURANDO:
				return 'badge badge-success';
			case estadosEgresos.REVISION:
				return 'badge badge-warning text-white';
			case estadosEgresos.PROYECTO:
				return 'badge badge-primary';
			case estadosProyecto.ESPERANDO:
				return 'badge badge-warning text-white';
			case estadosEgresos.CURSANDO:
				return 'badge badge-info text-white';
			case estadosEgresos.FINALIZADO:
				return 'badge badge-secondary';
		}
	}

}
