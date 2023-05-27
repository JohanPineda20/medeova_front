import { Component } from '@angular/core';
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";
import {RegisterRequestDto} from "../../../../core/dto/registerRequestDto";
import Swal from 'sweetalert2'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent  {

  /**
   * Formulario reactivo de registro
   */
  public registerForm: FormGroup;

  public message: string

  public registered: boolean;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    super();
    this.registered = false;
    this.registerForm = this.fb.group({
      username: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$") ]],
      password: ['', Validators.required ]
    });
  }


  public async register(): Promise<void> {

    if (this.registerForm.valid) {

      let dtoRegister: RegisterRequestDto = this.registerForm.value;

      this.authService.register(dtoRegister).subscribe(response => {
        this.message = response.message
        this.registered = true;
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
      console.log(this.getAllErrorsForm(this.registerForm));
      this.registerForm.markAllAsTouched();
    }

  }


  /**
   * Retorna mensaje de error de un campo del formulario
   * @param field
   */
  public getErrorForm(field: string): string {
    let message;

    const required: Array<String> = ["username", "email","password"];
    const formatEmail: Array<String> = ["email"]



    if (this.isTouchedField(this.registerForm, field)) {

      if (required.includes(field) && this.registerForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if (formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }

}
