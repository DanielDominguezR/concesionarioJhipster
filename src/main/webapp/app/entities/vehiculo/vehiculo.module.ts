import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConcesionarioSharedModule } from 'app/shared';
import {
  VehiculoComponent,
  VehiculoDetailComponent,
  VehiculoUpdateComponent,
  VehiculoDeletePopupComponent,
  VehiculoDeleteDialogComponent,
  vehiculoRoute,
  vehiculoPopupRoute
} from './';
import { NgbdModalContent } from './vehiculo-info.component';

const ENTITY_STATES = [...vehiculoRoute, ...vehiculoPopupRoute];

@NgModule({
  imports: [ConcesionarioSharedModule, RouterModule.forChild(ENTITY_STATES), ReactiveFormsModule, HttpClientModule],
  declarations: [
    VehiculoComponent,
    VehiculoDetailComponent,
    VehiculoUpdateComponent,
    VehiculoDeleteDialogComponent,
    VehiculoDeletePopupComponent,
    NgbdModalContent
  ],
  entryComponents: [
    VehiculoComponent,
    VehiculoUpdateComponent,
    VehiculoDeleteDialogComponent,
    VehiculoDeletePopupComponent,
    NgbdModalContent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConcesionarioVehiculoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
