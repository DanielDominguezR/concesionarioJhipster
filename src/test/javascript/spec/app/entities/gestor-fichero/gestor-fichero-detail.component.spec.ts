/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConcesionarioTestModule } from '../../../test.module';
import { GestorFicheroDetailComponent } from 'app/entities/gestor-fichero/gestor-fichero-detail.component';
import { GestorFichero } from 'app/shared/model/gestor-fichero.model';

describe('Component Tests', () => {
  describe('GestorFichero Management Detail Component', () => {
    let comp: GestorFicheroDetailComponent;
    let fixture: ComponentFixture<GestorFicheroDetailComponent>;
    const route = ({ data: of({ gestorFichero: new GestorFichero(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [GestorFicheroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GestorFicheroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestorFicheroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gestorFichero).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
