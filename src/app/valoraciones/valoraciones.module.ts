import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValoracionesPageRoutingModule } from './valoraciones-routing.module';

import { ValoracionesPage } from './valoraciones.page';
import { NavBarPageModule } from '../nav-bar/nav-bar.module';
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValoracionesPageRoutingModule,
    NavBarPageModule,
    NavBar2PageModule
  ],
  declarations: [ValoracionesPage]
})
export class ValoracionesPageModule {}
