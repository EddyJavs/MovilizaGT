import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestedTripsPage } from './requested-trips.page';

const routes: Routes = [
  {
    path: '',
    component: RequestedTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestedTripsPageRoutingModule {}
