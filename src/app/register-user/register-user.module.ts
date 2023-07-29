import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUserPageRoutingModule } from './register-user-routing.module';

import { RegisterUserPage } from './register-user.page';

import { ReactiveFormsModule } from '@angular/forms';

import { NavBarPageModule } from '../nav-bar/nav-bar.module';
import { NavBar2PageModule } from '../nav-bar2/nav-bar2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserPageRoutingModule,
    ReactiveFormsModule,
    NavBarPageModule,
    NavBar2PageModule
  ],
  declarations: [RegisterUserPage]
})
export class RegisterUserPageModule {}
