import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-promesas',
	templateUrl: './promesas.component.html',
	styles: []
})
export class PromesasComponent implements OnDestroy {

	subscription: Subscription;

	constructor(
		private titulo: Title
	) {
		this.titulo.setTitle('Promesas');
		// this.contarTresProm().then(() => console.log('Resuelta'))
		// .catch(error => console.error('Error', error));

		// this.contarTresObs().pipe(
		// 	retry(3)
		// )
		// this.subscription = this.contarTresObs().subscribe(
		// 	num => console.log('Sub', num),
		// 	error => console.error('Error', error),
		// 	() => console.log('Observer termino')
		// );

	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}

	contarTresObs() {
		return new Observable(observer => {
			let contador = 0;
			const interval = setInterval(() => {
				contador += 1;
				const salida = {
					valor: contador
				};
				observer.next(salida);
				if (contador === 7) {
					clearInterval(interval);
					// observer.complete();
				}

				// if (contador === 2) {
				// 	clearInterval(interval);
				// 	observer.error('Fallo este pedo alav.');
				// }

			}, 1000);
		}).pipe(
			map((resp: any) => resp = resp.valor),
			filter((val) => val = ((val % 2) === 1) ? true : false)
		);
	}

	contarTresProm() {
		return new Promise((resolve, reject) => {
			let cont = 0;
			const interval = setInterval(() => {
				cont += 1;
				console.log(cont);
				if (cont === 3) {
					reject('Hubo un error alav');
					// resolve();
					clearInterval(interval);
				}
			}, 1000);
		});
	}

}
