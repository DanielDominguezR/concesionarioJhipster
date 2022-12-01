import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';

@Component({
  selector: 'jhi-gestor-fichero-detail',
  templateUrl: './gestor-fichero-detail.component.html'
})
export class GestorFicheroDetailComponent implements OnInit {
  gestorFichero: IGestorFichero;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gestorFichero }) => {
      this.gestorFichero = gestorFichero;
    });
  }

  previousState() {
    window.history.back();
  }
}
