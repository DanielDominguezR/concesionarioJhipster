import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConcesionarioSharedModule } from 'app/shared';
import {
  TrabajadorComponent,
  TrabajadorDetailComponent,
  TrabajadorUpdateComponent,
  TrabajadorDeletePopupComponent,
  TrabajadorDeleteDialogComponent,
  trabajadorRoute,
  trabajadorPopupRoute
} from './';
import { NgbdModalContent } from './trabajador-info.component';
import { NgbdModalContentComision } from './trabajador-comision.component';

const ENTITY_STATES = [...trabajadorRoute, ...trabajadorPopupRoute];

@NgModule({
  imports: [ConcesionarioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrabajadorComponent,
    TrabajadorDetailComponent,
    TrabajadorUpdateComponent,
    TrabajadorDeleteDialogComponent,
    TrabajadorDeletePopupComponent,
    NgbdModalContent,
    NgbdModalContentComision
  ],
  entryComponents: [
    TrabajadorComponent,
    TrabajadorUpdateComponent,
    TrabajadorDeleteDialogComponent,
    TrabajadorDeletePopupComponent,
    NgbdModalContent,
    NgbdModalContentComision
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConcesionarioTrabajadorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
