import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styles: []
})
export class GeneroComponent implements OnInit {

    constructor(
        private router: Router,
		private activitedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }

}
