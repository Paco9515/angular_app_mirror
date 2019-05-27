import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscritorioComponent } from './components/escritorio/escritorio.component';
import { ProgramasComponent } from './components/cp/programa/programas.component';
import { ProgramaComponent } from './components/cp/programa/programa.component';

const routes: Routes = [
	{ path: 'panel-adm', component: EscritorioComponent },
	{ path: 'panel-adm/programas', component: ProgramasComponent },
	{ path: 'panel-adm/programa/:id', component: ProgramaComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'panel-adm' },
	{ path: '**', pathMatch: 'full', redirectTo: 'panel-adm' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
