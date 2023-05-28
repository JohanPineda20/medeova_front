import { Component } from '@angular/core';
import { JsonService } from 'src/app/core/services/json.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  unidades : any[]

  constructor(private jsonService: JsonService, private router: Router) {
    this.getJsonData();
  }

  getJsonData() {
    this.jsonService.getJsonData().subscribe(data => {
        this.unidades = data.unidades;
        console.log(data.unidades)
      }
    );
  }
}