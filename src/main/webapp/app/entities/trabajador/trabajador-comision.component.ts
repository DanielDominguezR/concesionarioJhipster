import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICompraVenta } from 'app/shared/model/compra-venta.model';
import { ITrabajador } from 'app/shared/model/trabajador.model';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './trabajador-comision.component.html'
})
export class NgbdModalContentComision {
  @Input() trabajador: ITrabajador;

  close() {
    this.activeModal.dismiss('cancel');
  }

  confirmInfo() {
    let comision;
    let numeroComision = 0.05;
    let totalcomision;
    comision = this.trabajador.ventas_totales * numeroComision;
    totalcomision = comision;
    (<HTMLInputElement>document.getElementById('comision')).innerHTML = '<p>' + totalcomision + '</p>';
  }
  constructor(protected activeModal: NgbActiveModal) {}
}
