import { Injectable } from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {TokenService} from "./token.service";
import { EstudianteDto } from '../dto/estudianteDto';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getEstudiante(codigo:string): Observable<EstudianteDto> {
    return this.http.get<EstudianteDto>(`${apiUrl}/api/estudiante/${codigo}`);
  }

}