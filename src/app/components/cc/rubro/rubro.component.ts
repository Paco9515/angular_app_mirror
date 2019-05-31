import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styles: []
})
export class RubroComponent implements OnInit {

    constructor(
        private router: Router,
        private activitedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
    }

}
