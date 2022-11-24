import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IVehiculo } from 'app/shared/model/vehiculo.model';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './vehiculo-info.component.html'
})
export class NgbdModalContent {
  @Input() vehiculo: IVehiculo;

  constructor(protected activeModal: NgbActiveModal) {}

  // ngOnInit() {

  //     this.updateForm(this.vehiculo);

  // }

  close() {
    this.activeModal.dismiss('cancel');
  }

  confirmInfo() {
    this.activeModal.close('Modal confirmado');
  }
}
