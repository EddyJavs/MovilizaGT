import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestedTripsPageRoutingModule } from './requested-trips-routing.module';

import { RequestedTripsPage } from './requested-trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestedTripsPageRoutingModule
  ],
  declarations: [RequestedTripsPage]
})
export class RequestedTripsPageModule {}
