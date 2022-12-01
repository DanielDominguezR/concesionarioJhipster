import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConcesionarioSharedModule } from 'app/shared';
import {
  FicheroComponent,
  FicheroDetailComponent,
  FicheroUpdateComponent,
  FicheroDeletePopupComponent,
  FicheroDeleteDialogComponent,
  ficheroRoute,
  ficheroPopupRoute
} from './';
import { HttpClientModule } from '@angular/common/http';

const ENTITY_STATES = [...ficheroRoute, ...ficheroPopupRoute];

@NgModule({
  imports: [ConcesionarioSharedModule, RouterModule.forChild(ENTITY_STATES), HttpClientModule],
  declarations: [
    FicheroComponent,
    FicheroDetailComponent,
    FicheroUpdateComponent,
    FicheroDeleteDialogComponent,
    FicheroDeletePopupComponent
  ],
  entryComponents: [FicheroComponent, FicheroUpdateComponent, FicheroDeleteDialogComponent, FicheroDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConcesionarioFicheroModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
