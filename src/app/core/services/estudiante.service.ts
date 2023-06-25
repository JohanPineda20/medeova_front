import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  uri = `${apiUrl}/estudiante`;
  constructor(private http:HttpClient) { }


  public getProgreso(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/progreso`);
  }

  public isCompletada(id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/detactividad/completada`, id);
  }

  public completarActividad(detalle:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/detactividad`, detalle);
  }

  public getProgresoByUnidad(codigo:any, id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${codigo}/progreso/${id}`);
  }

  public listar():Observable<any[]>{
    return this.http.get<any>(`${this.uri}`);
  }

  public encontrar(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  public get(id:any):Observable<any>{
    return this.http.get<any>(`${this.uri}/${id}/raw`);
  }

  public guardar(nuevo:any):Observable<any>{
    return this.http.post<any>(`${this.uri}`, nuevo);
  }
}