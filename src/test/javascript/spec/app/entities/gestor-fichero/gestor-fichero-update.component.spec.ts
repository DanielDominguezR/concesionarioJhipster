/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ConcesionarioTestModule } from '../../../test.module';
import { GestorFicheroUpdateComponent } from 'app/entities/gestor-fichero/gestor-fichero-update.component';
import { GestorFicheroService } from 'app/entities/gestor-fichero/gestor-fichero.service';
import { GestorFichero } from 'app/shared/model/gestor-fichero.model';

describe('Component Tests', () => {
  describe('GestorFichero Management Update Component', () => {
    let comp: GestorFicheroUpdateComponent;
    let fixture: ComponentFixture<GestorFicheroUpdateComponent>;
    let service: GestorFicheroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [GestorFicheroUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GestorFicheroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestorFicheroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestorFicheroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GestorFichero(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GestorFichero();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
