import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComputoPage } from './computo.page';

const routes: Routes = [
  {
    path: '',
    component: ComputoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputoPageRoutingModule {}
