import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	menu: any;

	constructor() {
		this.menu =  {
			titulo: 'Escritorio',
			icono: 'fa fa-dashboard',
			submenu: {
				titulo: ''
			}
		};
	}
}