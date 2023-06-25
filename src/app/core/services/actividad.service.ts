import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  uri = `${apiUrl}/actividad`;
  constructor(private http:HttpClient) { }

  public listar():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public getCompletadas():Observable<any[]>{
    return this.http.get<any>(`${this.uri}/completadas`);
  }

  public encontrar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public getPorcentaje(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/porcentaje`);
  }

  public getPromedioDificultad(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/promedio`);
  }

  public guardar(nuevo:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, nuevo);
  }

  public eliminar(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}