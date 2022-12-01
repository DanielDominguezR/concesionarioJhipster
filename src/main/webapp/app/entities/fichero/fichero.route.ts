import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Fichero } from 'app/shared/model/fichero.model';
import { FicheroService } from './fichero.service';
import { FicheroComponent } from './fichero.component';
import { FicheroDetailComponent } from './fichero-detail.component';
import { FicheroUpdateComponent } from './fichero-update.component';
import { FicheroDeletePopupComponent } from './fichero-delete-dialog.component';
import { IFichero } from 'app/shared/model/fichero.model';

@Injectable({ providedIn: 'root' })
export class FicheroResolve implements Resolve<IFichero> {
  constructor(private service: FicheroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFichero> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Fichero>) => response.ok),
        map((fichero: HttpResponse<Fichero>) => fichero.body)
      );
    }
    return of(new Fichero());
  }
}

export const ficheroRoute: Routes = [
  {
    path: '',
    component: FicheroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.fichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FicheroDetailComponent,
    resolve: {
      fichero: FicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.fichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FicheroUpdateComponent,
    resolve: {
      fichero: FicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.fichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FicheroUpdateComponent,
    resolve: {
      fichero: FicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.fichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ficheroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FicheroDeletePopupComponent,
    resolve: {
      fichero: FicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.fichero.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
