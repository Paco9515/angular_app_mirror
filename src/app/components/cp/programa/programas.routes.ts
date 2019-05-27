import { Routes } from '@angular/router';
import { ProgramaComponent } from './programa.component';

export const CHILDREN_ROUTES_PROGRAMA: Routes = [
  { path: 'programa/:id', component: ProgramaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'nuevo' }
];
