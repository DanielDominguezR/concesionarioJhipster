import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFichero } from 'app/shared/model/fichero.model';

@Component({
  selector: 'jhi-fichero-detail',
  templateUrl: './fichero-detail.component.html'
})
export class FicheroDetailComponent implements OnInit {
  fichero: IFichero;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fichero }) => {
      this.fichero = fichero;
    });
  }

  previousState() {
    window.history.back();
  }
}
