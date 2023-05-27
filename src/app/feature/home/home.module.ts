import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/layouts/nav/nav.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
   // HeaderNavComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
