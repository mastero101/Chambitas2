import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputoPageRoutingModule } from './computo-routing.module';

import { ComputoPage } from './computo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComputoPageRoutingModule
  ],
  declarations: [ComputoPage]
})
export class ComputoPageModule {}
