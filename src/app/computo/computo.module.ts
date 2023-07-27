import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputoPageRoutingModule } from './computo-routing.module';

import { ComputoPage } from './computo.page';
import { NavBarPageModule } from "../nav-bar/nav-bar.module";
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
    declarations: [ComputoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComputoPageRoutingModule,
        NavBarPageModule,
        NavBar2PageModule
    ]
})
export class ComputoPageModule {}
