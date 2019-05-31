import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent {

	forma: FormGroup;

    constructor(
        private router: Router,
		private activitedRoute: ActivatedRoute
    ) { }



}
