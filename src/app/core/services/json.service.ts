import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  url = 'https://raw.githubusercontent.com/Valentina-03/backend-ovacomputacion/main/data.json'

  constructor(private http: HttpClient) {}

  getJsonData(url:any) {
    //return this.http.get(this.url);
    return this.http.get<any>(url)
  }

  getUnidad(i: number){
    return this.http.get<any>('assets/data.json').pipe(
      map((data: any) => data.unidades[i])
    );
  }

  getTema(i: number, j:number){
    return this.http.get<any>('assets/data.json').pipe(
      map((data: any) => data.unidades[i].temas[j])
    );
  }

  getSubTema(i: number, j:number, k:number){
    return this.http.get<any>('assets/data.json').pipe(
      map((data: any) => data.unidades[i].temas[j].subtemas[k])
    );
  }
}