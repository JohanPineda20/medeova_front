import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  url = 'https://raw.githubusercontent.com/Valentina-03/backend-ovacomputacion/main/data.json'

  constructor(private http: HttpClient) {}

  getJsonData() {
    //return this.http.get(this.url);
    return this.http.get<any>('assets/data.json')
  }
}