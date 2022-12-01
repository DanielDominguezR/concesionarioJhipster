import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';
import { AccountService } from 'app/core';
import { GestorFicheroService } from './gestor-fichero.service';

@Component({
  selector: 'jhi-gestor-fichero',
  templateUrl: './gestor-fichero.component.html'
})
export class GestorFicheroComponent implements OnInit, OnDestroy {
  gestorFicheroes: IGestorFichero[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected gestorFicheroService: GestorFicheroService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.gestorFicheroService
      .query()
      .pipe(
        filter((res: HttpResponse<IGestorFichero[]>) => res.ok),
        map((res: HttpResponse<IGestorFichero[]>) => res.body)
      )
      .subscribe(
        (res: IGestorFichero[]) => {
          this.gestorFicheroes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGestorFicheroes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGestorFichero) {
    return item.id;
  }

  registerChangeInGestorFicheroes() {
    this.eventSubscriber = this.eventManager.subscribe('gestorFicheroListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
