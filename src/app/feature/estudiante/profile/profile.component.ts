import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

 public perfilForm: FormGroup;
 

  constructor(private profileService: ProfileService, private tokenService:TokenService, private fb: FormBuilder)
  {
    
    this.profileService.getEstudiante(this.tokenService.getInfoToken().id).subscribe(response => {
      this.perfilForm.patchValue(response);
    });
    this.perfilForm = this.fb.group({
      codigo: [''],
      priNombre: [''],
      segNombre: [''],
      priApellido: [''],
      segApellido: [''],
      email: [''],
      password: [''],
    });
  }
}
