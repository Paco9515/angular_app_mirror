import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginOutGuard } from './common/guards/login-out.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginOutGuard] },
	{ path: '', pathMatch: 'full', redirectTo: 'login', canActivate: [LoginOutGuard] },
	{ path: '**', component: NopagefoundComponent }

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
