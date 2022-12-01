/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ConcesionarioTestModule } from '../../../test.module';
import { FicheroUpdateComponent } from 'app/entities/fichero/fichero-update.component';
import { FicheroService } from 'app/entities/fichero/fichero.service';
import { Fichero } from 'app/shared/model/fichero.model';

describe('Component Tests', () => {
  describe('Fichero Management Update Component', () => {
    let comp: FicheroUpdateComponent;
    let fixture: ComponentFixture<FicheroUpdateComponent>;
    let service: FicheroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [FicheroUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FicheroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FicheroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FicheroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fichero(123);
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
        const entity = new Fichero();
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
