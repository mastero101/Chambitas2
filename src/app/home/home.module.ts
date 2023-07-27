import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavBarPageModule } from '../nav-bar/nav-bar.module';
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NavBarPageModule,
    NavBar2PageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
