/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConcesionarioTestModule } from '../../../test.module';
import { GestorFicheroDeleteDialogComponent } from 'app/entities/gestor-fichero/gestor-fichero-delete-dialog.component';
import { GestorFicheroService } from 'app/entities/gestor-fichero/gestor-fichero.service';

describe('Component Tests', () => {
  describe('GestorFichero Management Delete Component', () => {
    let comp: GestorFicheroDeleteDialogComponent;
    let fixture: ComponentFixture<GestorFicheroDeleteDialogComponent>;
    let service: GestorFicheroService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [GestorFicheroDeleteDialogComponent]
      })
        .overrideTemplate(GestorFicheroDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestorFicheroDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestorFicheroService);
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
