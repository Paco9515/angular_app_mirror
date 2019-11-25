import { NgModule } from '@angular/core';

// Modulos
import { ClasfContableModule } from './clasfContable/clasfContable.module';
import { ClasfObjetoGastoModule } from './clasfObjetoGasto/clasfObjetoGasto.module';
import { ClasfProgramaticaModule } from './clasfProgramatica/clasfProgramatica.module';
import { ClasfAdministrativaModule } from './clasfAdministrativa/clasfAdministrativa.module';
import { ClasfFuenteFinanciamientoModule } from './clasfFuenteFinanciamiento/clasfFuenteFinanciamiento.module';
import { ClasfFuncionalGastoModule } from './clasfFuncionalGasto/clasfFuncionalGasto.module';


@NgModule({
	imports: [
		ClasfContableModule,
		ClasfObjetoGastoModule,
		ClasfProgramaticaModule,
		ClasfAdministrativaModule,

		ClasfFuenteFinanciamientoModule,
		ClasfFuncionalGastoModule
	]
})
export class ClasificacionModule { }
