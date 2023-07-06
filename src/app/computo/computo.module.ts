import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputoPageRoutingModule } from './computo-routing.module';

import { ComputoPage } from './computo.page';
import { NavBarPageModule } from "../nav-bar/nav-bar.module";

@NgModule({
    declarations: [ComputoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComputoPageRoutingModule,
        NavBarPageModule
    ]
})
export class ComputoPageModule {}
