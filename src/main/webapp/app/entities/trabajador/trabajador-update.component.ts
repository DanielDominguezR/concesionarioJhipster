import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITrabajador, Trabajador } from 'app/shared/model/trabajador.model';
import { TrabajadorService } from './trabajador.service';

@Component({
  selector: 'jhi-trabajador-update',
  templateUrl: './trabajador-update.component.html'
})
export class TrabajadorUpdateComponent implements OnInit {
  trabajador: ITrabajador;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    dni: [],
    nombre: [],
    apellido: [],
    cargo: [],
    telefono: []
  });

  constructor(protected trabajadorService: TrabajadorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ trabajador }) => {
      this.updateForm(trabajador);
      this.trabajador = trabajador;
    });
  }

  updateForm(trabajador: ITrabajador) {
    this.editForm.patchValue({
      id: trabajador.id,
      dni: trabajador.dni,
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      cargo: trabajador.cargo,
      telefono: trabajador.telefono
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const trabajador = this.createFromForm();
    if (trabajador.id !== undefined) {
      this.subscribeToSaveResponse(this.trabajadorService.update(trabajador));
    } else {
      this.subscribeToSaveResponse(this.trabajadorService.create(trabajador));
    }
  }

  private createFromForm(): ITrabajador {
    const entity = {
      ...new Trabajador(),
      id: this.editForm.get(['id']).value,
      dni: this.editForm.get(['dni']).value,
      nombre: this.editForm.get(['nombre']).value,
      apellido: this.editForm.get(['apellido']).value,
      cargo: this.editForm.get(['cargo']).value,
      telefono: this.editForm.get(['telefono']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrabajador>>) {
    result.subscribe((res: HttpResponse<ITrabajador>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
