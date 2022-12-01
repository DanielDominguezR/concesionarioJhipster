/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConcesionarioTestModule } from '../../../test.module';
import { FicheroDetailComponent } from 'app/entities/fichero/fichero-detail.component';
import { Fichero } from 'app/shared/model/fichero.model';

describe('Component Tests', () => {
  describe('Fichero Management Detail Component', () => {
    let comp: FicheroDetailComponent;
    let fixture: ComponentFixture<FicheroDetailComponent>;
    const route = ({ data: of({ fichero: new Fichero(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConcesionarioTestModule],
        declarations: [FicheroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FicheroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FicheroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fichero).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
