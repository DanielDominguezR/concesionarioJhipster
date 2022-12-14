import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IVehiculo, Tipo, Vehiculo } from 'app/shared/model/vehiculo.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { VehiculoService } from './vehiculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './vehiculo-info.component';
import { VehiculoUpdateComponent } from './vehiculo-update.component';

@Component({
  selector: 'jhi-vehiculo',
  templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit, OnDestroy {
  currentAccount: any;
  vehiculos: IVehiculo[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected vehiculoService: VehiculoService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  open(vehiculo: Vehiculo) {
    const modalVehiculo = this.modalService.open(NgbdModalContent);

    modalVehiculo.componentInstance.vehiculo = vehiculo;
    modalVehiculo.result.then(result => {
      alert(result);
    });
  }

  openEdit(vehiculo?: Vehiculo) {
    const modalVehiculo = this.modalService.open(VehiculoUpdateComponent);

    modalVehiculo.componentInstance.vehiculo = vehiculo;
    modalVehiculo.result.then(result => {
      this.loadAll();
    });
  }

  loadAll() {
    this.vehiculoService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IVehiculo[]>) => this.paginateVehiculos(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  filterWithType() {
    this.vehiculoService
      .filterWithType(Tipo.COCHE, {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IVehiculo[]>) => this.paginateVehiculos(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  filtercarsDisponibles() {
    this.vehiculoService
      .filtercarsDisponible({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IVehiculo[]>) => this.paginateVehiculos(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  filternoDisponibles() {
    this.vehiculoService
      .filtercarsnoDisponible({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IVehiculo[]>) => this.paginateVehiculos(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/vehiculo'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/vehiculo',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVehiculos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVehiculo) {
    return item.id;
  }

  registerChangeInVehiculos() {
    this.eventSubscriber = this.eventManager.subscribe('vehiculoListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateVehiculos(data: IVehiculo[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.vehiculos = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
