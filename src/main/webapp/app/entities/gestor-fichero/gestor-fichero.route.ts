import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GestorFichero } from 'app/shared/model/gestor-fichero.model';
import { GestorFicheroService } from './gestor-fichero.service';
import { GestorFicheroComponent } from './gestor-fichero.component';
import { GestorFicheroDetailComponent } from './gestor-fichero-detail.component';
import { GestorFicheroUpdateComponent } from './gestor-fichero-update.component';
import { GestorFicheroDeletePopupComponent } from './gestor-fichero-delete-dialog.component';
import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';

@Injectable({ providedIn: 'root' })
export class GestorFicheroResolve implements Resolve<IGestorFichero> {
  constructor(private service: GestorFicheroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGestorFichero> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GestorFichero>) => response.ok),
        map((gestorFichero: HttpResponse<GestorFichero>) => gestorFichero.body)
      );
    }
    return of(new GestorFichero());
  }
}

export const gestorFicheroRoute: Routes = [
  {
    path: '',
    component: GestorFicheroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.gestorFichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GestorFicheroDetailComponent,
    resolve: {
      gestorFichero: GestorFicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.gestorFichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GestorFicheroUpdateComponent,
    resolve: {
      gestorFichero: GestorFicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.gestorFichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GestorFicheroUpdateComponent,
    resolve: {
      gestorFichero: GestorFicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.gestorFichero.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const gestorFicheroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GestorFicheroDeletePopupComponent,
    resolve: {
      gestorFichero: GestorFicheroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'concesionarioApp.gestorFichero.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
