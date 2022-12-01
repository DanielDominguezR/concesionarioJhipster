/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConcesionarioTestModule } from '../../../test.module';
import { FicheroComponent } from 'app/entities/fichero/fichero.component';
import { FicheroService } from 'app/entities/fichero/fichero.service';
import { Fichero } from 'app/shared/model/fichero.model';

describe('Component Tests', () => {
  describe('Fichero Management Component', () => {
    let comp: FicheroComponent;
    let fixture: ComponentFixture<FicheroComponent>;
    let service: FicheroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [FicheroComponent],
        providers: []
      })
        .overrideTemplate(FicheroComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FicheroComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FicheroService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fichero(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ficheroes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
