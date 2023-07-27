import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessPageRoutingModule } from './process-routing.module';

import { ProcessPage } from './process.page';
import { NavBarPageModule } from '../nav-bar/nav-bar.module';
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessPageRoutingModule,
    NavBarPageModule,
    NavBar2PageModule
  ],
  declarations: [ProcessPage]
})
export class ProcessPageModule {}
