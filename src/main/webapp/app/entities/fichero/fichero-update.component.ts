import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFichero, Fichero } from 'app/shared/model/fichero.model';
import { FicheroService } from './fichero.service';
import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';
import { GestorFicheroService } from 'app/entities/gestor-fichero';

@Component({
  selector: 'jhi-fichero-update',
  templateUrl: './fichero-update.component.html'
})
export class FicheroUpdateComponent implements OnInit {
  fichero: IFichero;
  isSaving: boolean;

  gestorficheroes: IGestorFichero[];

  editForm = this.fb.group({
    id: [],
    path: [],
    nombre_fichero: [],
    contentType: [],
    ficheros: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ficheroService: FicheroService,
    protected gestorFicheroService: GestorFicheroService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fichero }) => {
      this.updateForm(fichero);
      this.fichero = fichero;
    });
    this.gestorFicheroService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGestorFichero[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGestorFichero[]>) => response.body)
      )
      .subscribe((res: IGestorFichero[]) => (this.gestorficheroes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(fichero: IFichero) {
    this.editForm.patchValue({
      id: fichero.id,
      path: fichero.path,
      nombre_fichero: fichero.nombre_fichero,
      contentType: fichero.contentType,
      ficheros: fichero.ficheros
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const fichero = this.createFromForm();
    if (fichero.id !== undefined) {
      this.subscribeToSaveResponse(this.ficheroService.update(fichero));
    } else {
      this.subscribeToSaveResponse(this.ficheroService.create(fichero));
    }
  }

  private createFromForm(): IFichero {
    const entity = {
      ...new Fichero(),
      id: this.editForm.get(['id']).value,
      path: this.editForm.get(['path']).value,
      nombre_fichero: this.editForm.get(['nombre_fichero']).value,
      contentType: this.editForm.get(['contentType']).value,
      ficheros: this.editForm.get(['ficheros']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFichero>>) {
    result.subscribe((res: HttpResponse<IFichero>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackGestorFicheroById(index: number, item: IGestorFichero) {
    return item.id;
  }
}
