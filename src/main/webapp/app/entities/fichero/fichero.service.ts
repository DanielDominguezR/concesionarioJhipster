import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFichero } from 'app/shared/model/fichero.model';

type EntityResponseType = HttpResponse<IFichero>;
type EntityArrayResponseType = HttpResponse<IFichero[]>;

@Injectable({ providedIn: 'root' })
export class FicheroService {
  public resourceUrl = SERVER_API_URL + 'api/ficheroes';
  private baseUrl = 'http://localhost:9000';

  constructor(protected http: HttpClient) {}

  create(fichero: IFichero): Observable<EntityResponseType> {
    return this.http.post<IFichero>(this.resourceUrl, fichero, { observe: 'response' });
  }

  update(fichero: IFichero): Observable<EntityResponseType> {
    return this.http.put<IFichero>(this.resourceUrl, fichero, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFichero>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFichero[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.resourceUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
