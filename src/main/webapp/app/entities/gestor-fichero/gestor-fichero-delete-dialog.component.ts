import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';
import { GestorFicheroService } from './gestor-fichero.service';

@Component({
  selector: 'jhi-gestor-fichero-delete-dialog',
  templateUrl: './gestor-fichero-delete-dialog.component.html'
})
export class GestorFicheroDeleteDialogComponent {
  gestorFichero: IGestorFichero;

  constructor(
    protected gestorFicheroService: GestorFicheroService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.gestorFicheroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'gestorFicheroListModification',
        content: 'Deleted an gestorFichero'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-gestor-fichero-delete-popup',
  template: ''
})
export class GestorFicheroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gestorFichero }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GestorFicheroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.gestorFichero = gestorFichero;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/gestor-fichero', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/gestor-fichero', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
