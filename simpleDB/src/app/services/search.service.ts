import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseURL = 'http://localhost:3000/search';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getProduct(query): Observable<any> {
    return this.httpClient.get(`${baseURL}/product/${query}`);
  }

  getType(query): Observable<any> {
    return this.httpClient.get(`${baseURL}/type/${query}`);
  }

  getMaterial(query): Observable<any> {
    return this.httpClient.get(`${baseURL}/material/${query}`);
  }
  getCat(type, material): Observable<any> {
    //console.log(this.httpClient.get(baseURL))
    console.log(`${baseURL}/cat?type=${type}&material=${material}`)
    return this.httpClient.get(`${baseURL}/cat?type=${type}&material=${material}`);
  }

}
