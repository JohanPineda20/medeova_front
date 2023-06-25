import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  uri = `${apiUrl}/unidad`;
  constructor(private http:HttpClient) { }

  
  public getTemas(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/temas`);
  }

  public getActividades(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/actividades`);
  }

  public getActividadesCompletadas(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/actividades/completadas`);
  }

  public getpromedioDificultad(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/actividades/avg`);
  }

  public listar():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public editar(nuevo:any, id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/${id}`, nuevo);
  }

  public guardar(nuevo:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, nuevo);
  }

  public eliminar(id:any):Observable<any>{
    return this.http.delete<any>(`${this.uri}/${id}`);
  }

}