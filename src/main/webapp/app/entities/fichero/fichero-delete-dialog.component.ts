import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFichero } from 'app/shared/model/fichero.model';
import { FicheroService } from './fichero.service';

@Component({
  selector: 'jhi-fichero-delete-dialog',
  templateUrl: './fichero-delete-dialog.component.html'
})
export class FicheroDeleteDialogComponent {
  fichero: IFichero;

  constructor(protected ficheroService: FicheroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ficheroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ficheroListModification',
        content: 'Deleted an fichero'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-fichero-delete-popup',
  template: ''
})
export class FicheroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fichero }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FicheroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.fichero = fichero;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/fichero', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/fichero', { outlets: { popup: null } }]);
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
