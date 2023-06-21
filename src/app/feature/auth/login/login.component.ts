import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppBaseComponent} from "src/app/core/utils/AppBaseComponent";
import {AuthLoginRequestDto} from "src/app/core/dto/authLoginRequestDto";
import {AuthService} from "src/app/core/services/auth.service";
import {lastValueFrom} from "rxjs";
import {TokenService} from "src/app/core/services/token.service";
import {ErrorsForm} from "src/app/core/enums/ErrorsForm";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {

  /**
   * Formulario reactivo de login
   */
  public loginForm: FormGroup;

  public message: string

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    super();//por extender de AppBaseComponent
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
  }


  public login(): void{
    this.authService.signIn(this.loginForm.value).subscribe(response => {
    console.log(response);
    });

  }

  public async signIn(): Promise<void> {
    if (this.loginForm.valid) {
      let dtoLogin: AuthLoginRequestDto;
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;
      dtoLogin = {
        "email": email,
        password
      }

      this.authService.signIn(dtoLogin).subscribe(response => {
        if(this.tokenService.getInfoToken().rol.some((r) => r.authority === "USER")){
          this.router.navigateByUrl("/home");
        }
        else{
          this.router.navigateByUrl("/dashboard");
        }
      
      },
      error => {
        this.message = error.error
      })




    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      })
      console.log(this.getAllErrorsForm(this.loginForm));
      this.loginForm.markAllAsTouched();
    }

  }

 /* public signUp(): void {
    this.router.navigateByUrl("registro"); //navegacion mediante la clase Router (router.navigateByUrl(""))
  }*/

  /**
   * Retorna mensaje de error de un campo del formulario
   * @param field
   */
  public getErrorForm(field: string): string {
    let message;

    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if (this.loginForm.get(field).hasError('email')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }

}
