import { Injectable } from '@angular/core';
import {AuthLoginRequestDto} from "../dto/authLoginRequestDto";
import {Observable, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthLoginResponseDto} from "../dto/authLoginResponseDto";
import {TokenService} from "./token.service";
import {RegisterRequestDto} from "../dto/registerRequestDto";
import {RegisterResponseDto} from "../dto/registerResponseDto";
import {environment} from "../../../environments/environment.development";
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${apiUrl}/auth/signup`, registerDto);
  }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
       return this.http.post<AuthLoginResponseDto>(`${apiUrl}/auth/login`, authDto).pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
          console.log(response.token)
        })
      );
  }

}
