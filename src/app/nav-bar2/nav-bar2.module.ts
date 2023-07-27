import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavBar2PageRoutingModule } from './nav-bar2-routing.module';

import { NavBar2Page } from './nav-bar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavBar2PageRoutingModule
  ],
  declarations: [NavBar2Page],
  exports: [NavBar2Page]
})
export class NavBar2PageModule {}
