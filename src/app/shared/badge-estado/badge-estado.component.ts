import { Component, Input } from '@angular/core';
import { EstadosEgresos } from '../../constants/estadosEgresos';


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
			case EstadosEgresos.CAPTURANDO:
				return 'badge badge-success';
			case EstadosEgresos.REVISION:
				return 'badge badge-warning text-white';
			case EstadosEgresos.PROYECTO:
				return 'badge badge-primary';
			case EstadosEgresos.ESPERANDO:
				return 'badge badge-warning text-white';
			case EstadosEgresos.CURSANDO:
				return 'badge badge-info text-white';
			case EstadosEgresos.FINALIZADO:
				return 'badge badge-secondary';
		}
	}

}
