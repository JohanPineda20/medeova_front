import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'src/global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtemaService {

  uri = `${global.url}/subtema`;
  constructor(private http:HttpClient) { }

  public getMultimedia(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/multimedia`);
  }

  public listar():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public guardar(nuevo:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, nuevo);
  }

  public editar(nuevo:any, id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/${id}`, nuevo);
  }

  public eliminar(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}