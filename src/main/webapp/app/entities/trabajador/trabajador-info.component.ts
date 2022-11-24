import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICompraVenta } from 'app/shared/model/compra-venta.model';
import { ITrabajador } from 'app/shared/model/trabajador.model';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './trabajador-info.component.html'
})
export class NgbdModalContent {
  @Input() trabajador: ITrabajador;

  close() {
    this.activeModal.dismiss('cancel');
  }

  confirmInfo() {
    this.activeModal.close('Modal confirmado');
  }
  constructor(protected activeModal: NgbActiveModal) {}
}
