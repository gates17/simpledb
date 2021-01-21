import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000/products';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getTotal(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  getAll(token: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', token);
    //console.log(this.httpClient.get(baseURL))
    return this.httpClient.get(baseURL);
  }

  get(id): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${baseURL}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }

  softDelete(id, data): Observable<any> {
    return this.httpClient.put(`${baseURL}/${id}`, data);
  }

  /* deleteAll(data): Observable<any> {
    return this.httpClient.delete(baseURL,data);
  } */

  searchReference(name): Observable<any> {
    return this.httpClient.get(`${baseURL}/reference?ref=${name}`);
  }

  getPage(itemsPerPage, pageNumber): Observable<any> {
    return this.httpClient.get(`${baseURL}/page/${itemsPerPage}/${pageNumber}`)
  }

  getRemovedPage(itemsPerPage, pageNumber): Observable<any> {
    return this.httpClient.get(`${baseURL}/removed/${itemsPerPage}/${pageNumber}`)
  }
}
