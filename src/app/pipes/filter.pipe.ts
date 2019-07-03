import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(items: any[], id: any, campo: any): any[] {
		if (!items) return [];
		if (!id) return items;
		return items.filter( it => {
			if (it[campo] == id) {
				console.log(it[campo]);
				return it;
			}
		});
	}
}


