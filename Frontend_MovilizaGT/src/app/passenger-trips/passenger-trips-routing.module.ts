import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassengerTripsPage } from './passenger-trips.page';

const routes: Routes = [
  {
    path: '',
    component: PassengerTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengerTripsPageRoutingModule {}
