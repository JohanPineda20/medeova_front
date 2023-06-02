import { Component } from '@angular/core';
import {AppBaseComponent} from "src/app/core/utils/AppBaseComponent";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "src/app/core/services/auth.service";
import {ErrorsForm} from "src/app/core/enums/ErrorsForm";
import {RegisterRequestDto} from "src/app/core/dto/registerRequestDto";
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
      codigo: ['', [Validators.required, Validators.pattern("^[0-9]+$") ] ],
      priNombre: ['', [Validators.required, Validators.pattern("^[A-Za-z]+$")] ],
      segNombre: ['', Validators.pattern("^[A-Za-z]+$")],
      priApellido: ['', [Validators.required,Validators.pattern("^[A-Za-z]+$")] ],
      segApellido: ['', Validators.pattern("^[A-Za-z]+$")],
      email: ['', [ Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$") ]],
      password: ['', Validators.required ],
      repassword: ['', Validators.required]
    },{
      validator: this.passwordMatchValidator
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
      this.registerForm.markAllAsTouched();
    }

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('repassword').value;

    if (password !== confirmPassword) {
      formGroup.get('repassword').setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('repassword').setErrors(null);
    }
  }
  /**
   * Retorna mensaje de error de un campo del formulario
   * @param field
   */
  public getErrorForm(field: string): string {
    let message;

    const required: Array<String> = ["codigo", "priNombre", "priApellido", "email","password","repassword"];
    const formatNombres: Array<String> = ["priNombre", "priApellido", "segNombre", "segApellido"]
  
    if (this.isTouchedField(this.registerForm, field)) {

      if (required.includes(field) && this.registerForm.get(field).hasError('required')){
        message = ErrorsForm.REQUIRED;
      } else if (field =="email" && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
      else if (field =="codigo" && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_NUMBER;
      }
      else if (formatNombres.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_LETTERS;
      }
      else if (field =="repassword" && this.registerForm.get(field).hasError('passwordMismatch')) {
        message = ErrorsForm.ERROR_PASSWORD;
      }

    }

    return message;
  }

}
