import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGestorFichero, GestorFichero } from 'app/shared/model/gestor-fichero.model';
import { GestorFicheroService } from './gestor-fichero.service';

@Component({
  selector: 'jhi-gestor-fichero-update',
  templateUrl: './gestor-fichero-update.component.html'
})
export class GestorFicheroUpdateComponent implements OnInit {
  gestorFichero: IGestorFichero;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    folder: []
  });

  constructor(protected gestorFicheroService: GestorFicheroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ gestorFichero }) => {
      this.updateForm(gestorFichero);
      this.gestorFichero = gestorFichero;
    });
  }

  updateForm(gestorFichero: IGestorFichero) {
    this.editForm.patchValue({
      id: gestorFichero.id,
      folder: gestorFichero.folder
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const gestorFichero = this.createFromForm();
    if (gestorFichero.id !== undefined) {
      this.subscribeToSaveResponse(this.gestorFicheroService.update(gestorFichero));
    } else {
      this.subscribeToSaveResponse(this.gestorFicheroService.create(gestorFichero));
    }
  }

  private createFromForm(): IGestorFichero {
    const entity = {
      ...new GestorFichero(),
      id: this.editForm.get(['id']).value,
      folder: this.editForm.get(['folder']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestorFichero>>) {
    result.subscribe((res: HttpResponse<IGestorFichero>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
