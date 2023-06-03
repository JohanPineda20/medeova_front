import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'src/global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  uri = `${global.url}/tema`;
  constructor(private http:HttpClient) { }


  public getSubtemas(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/subtemas`);
  }

  public getActividades(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/actividades`);
  }

  public getComentarios(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.uri}/${id}/comentarios`);
  }

  public addComentario(id:any, comentario:any):Observable<any[]>{
    return this.http.post<any>(`${this.uri}/${id}/comentarios`, comentario);
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

  public eliminar(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}