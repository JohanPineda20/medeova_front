import { SwiperDirective } from 'src/app/core/utils/swiper.directive';
import { Component} from '@angular/core';
import { JsonService } from 'src/app/core/services/json.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swiper from 'swiper';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent 
{
  unidad: any
  tema: any
  subtema: any
  ids: number[] = []

  constructor(private jsonService: JsonService, private router: Router, private aRouter: ActivatedRoute, private sanitizer: DomSanitizer) {
   
    this.ids[0] = Number(this.aRouter.snapshot.paramMap.get('idUnidad'))
    this.ids[1] = Number(this.aRouter.snapshot.paramMap.get('idTema'))
    this.loadData();
  }

  loadData() {
    this.jsonService.getUnidad(this.ids[0]).subscribe(data => this.unidad = data)
    this.jsonService.getTema(this.ids[0], this.ids[1]).subscribe(data => this.tema = data)
    this.changeSubtema(0)
  }

  changeSubtema(id:number){
    console.log(id)
    this.jsonService.getSubTema(this.ids[0], this.ids[1], id).subscribe(data => this.subtema = data)
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}