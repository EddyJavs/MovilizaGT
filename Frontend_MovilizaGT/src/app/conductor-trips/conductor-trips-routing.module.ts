import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorTripsPage } from './conductor-trips.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorTripsPageRoutingModule {}
