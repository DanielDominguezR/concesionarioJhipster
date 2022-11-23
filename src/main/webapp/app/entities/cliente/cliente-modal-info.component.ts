import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'jhi-cliente-modal-info',
  templateUrl: './cliente-modal-info.component.html'
})
export class ClienteModalInfoComponent {
  cliente: ICliente;

  constructor(protected clienteService: ClienteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmInfo(id: number) {
    this.activeModal.dismiss('submit');
    alert('Ha confirmado correctamente');
  }
}

@Component({
  selector: 'jhi-cliente-delete-popup',
  template: ''
})
export class ClienteInfoPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ClienteModalInfoComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cliente = cliente;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cliente', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cliente', { outlets: { popup: null } }]);
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
