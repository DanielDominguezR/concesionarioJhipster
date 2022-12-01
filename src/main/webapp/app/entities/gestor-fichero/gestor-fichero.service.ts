import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';

type EntityResponseType = HttpResponse<IGestorFichero>;
type EntityArrayResponseType = HttpResponse<IGestorFichero[]>;

@Injectable({ providedIn: 'root' })
export class GestorFicheroService {
  public resourceUrl = SERVER_API_URL + 'api/gestor-ficheroes';

  constructor(protected http: HttpClient) {}

  create(gestorFichero: IGestorFichero): Observable<EntityResponseType> {
    return this.http.post<IGestorFichero>(this.resourceUrl, gestorFichero, { observe: 'response' });
  }

  update(gestorFichero: IGestorFichero): Observable<EntityResponseType> {
    return this.http.put<IGestorFichero>(this.resourceUrl, gestorFichero, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGestorFichero>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGestorFichero[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
