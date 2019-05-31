import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcuenta',
  templateUrl: './subcuenta.component.html',
  styles: []
})
export class SubcuentaComponent implements OnInit {

    constructor(
        private router: Router,
		private activitedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }

}
