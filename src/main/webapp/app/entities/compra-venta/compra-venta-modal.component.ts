import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICompraVenta } from 'app/shared/model/compra-venta.model';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './compra-venta-modal.component.html'
})
export class NgbdModalContent {
  @Input() compraVenta: ICompraVenta;

  close() {
    this.activeModal.dismiss('cancel');
  }

  confirmInfo() {
    this.activeModal.close('Modal confirmado');
  }
  constructor(protected activeModal: NgbActiveModal) {}
}
