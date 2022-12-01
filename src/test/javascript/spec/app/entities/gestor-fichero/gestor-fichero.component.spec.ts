/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConcesionarioTestModule } from '../../../test.module';
import { GestorFicheroComponent } from 'app/entities/gestor-fichero/gestor-fichero.component';
import { GestorFicheroService } from 'app/entities/gestor-fichero/gestor-fichero.service';
import { GestorFichero } from 'app/shared/model/gestor-fichero.model';

describe('Component Tests', () => {
  describe('GestorFichero Management Component', () => {
    let comp: GestorFicheroComponent;
    let fixture: ComponentFixture<GestorFicheroComponent>;
    let service: GestorFicheroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [GestorFicheroComponent],
        providers: []
      })
        .overrideTemplate(GestorFicheroComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestorFicheroComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestorFicheroService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GestorFichero(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gestorFicheroes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
