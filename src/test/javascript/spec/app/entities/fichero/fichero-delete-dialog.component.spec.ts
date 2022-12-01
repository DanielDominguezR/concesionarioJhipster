/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConcesionarioTestModule } from '../../../test.module';
import { FicheroDeleteDialogComponent } from 'app/entities/fichero/fichero-delete-dialog.component';
import { FicheroService } from 'app/entities/fichero/fichero.service';

describe('Component Tests', () => {
  describe('Fichero Management Delete Component', () => {
    let comp: FicheroDeleteDialogComponent;
    let fixture: ComponentFixture<FicheroDeleteDialogComponent>;
    let service: FicheroService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [FicheroDeleteDialogComponent]
      })
        .overrideTemplate(FicheroDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FicheroDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FicheroService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
