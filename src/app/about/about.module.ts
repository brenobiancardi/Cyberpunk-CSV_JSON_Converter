import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { CarouselComponent } from './carousel/carousel.component';
@NgModule({
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutComponent, CarouselComponent],
})
export class AboutModule {}
