import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFichero } from 'app/shared/model/fichero.model';
import { AccountService } from 'app/core';
import { FicheroService } from './fichero.service';

@Component({
  selector: 'jhi-fichero',
  templateUrl: './fichero.component.html'
})
export class FicheroComponent implements OnInit, OnDestroy {
  ficheroes: IFichero[];
  currentAccount: any;
  eventSubscriber: Subscription;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(
    protected ficheroService: FicheroService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  previousState() {
    window.history.back();
  }

  loadAll() {
    this.ficheroService
      .query()
      .pipe(
        filter((res: HttpResponse<IFichero[]>) => res.ok),
        map((res: HttpResponse<IFichero[]>) => res.body)
      )
      .subscribe(
        (res: IFichero[]) => {
          this.ficheroes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFicheroes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFichero) {
    return item.id;
  }

  registerChangeInFicheroes() {
    this.eventSubscriber = this.eventManager.subscribe('ficheroListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.ficheroService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.ficheroService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
      // this.previousState()
    }
  }
}
