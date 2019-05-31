import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent implements OnInit {

    constructor(
        private router: Router,
		private activitedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }

}
