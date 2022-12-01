import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConcesionarioSharedModule } from 'app/shared';
import {
  GestorFicheroComponent,
  GestorFicheroDetailComponent,
  GestorFicheroUpdateComponent,
  GestorFicheroDeletePopupComponent,
  GestorFicheroDeleteDialogComponent,
  gestorFicheroRoute,
  gestorFicheroPopupRoute
} from './';

const ENTITY_STATES = [...gestorFicheroRoute, ...gestorFicheroPopupRoute];

@NgModule({
  imports: [ConcesionarioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GestorFicheroComponent,
    GestorFicheroDetailComponent,
    GestorFicheroUpdateComponent,
    GestorFicheroDeleteDialogComponent,
    GestorFicheroDeletePopupComponent
  ],
  entryComponents: [
    GestorFicheroComponent,
    GestorFicheroUpdateComponent,
    GestorFicheroDeleteDialogComponent,
    GestorFicheroDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConcesionarioGestorFicheroModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
