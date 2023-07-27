import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { NavBarPageModule } from '../nav-bar/nav-bar.module';
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    NavBarPageModule,
    NavBar2PageModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
