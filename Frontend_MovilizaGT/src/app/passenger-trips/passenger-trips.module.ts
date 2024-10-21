import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerTripsPageRoutingModule } from './passenger-trips-routing.module';

import { PassengerTripsPage } from './passenger-trips.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengerTripsPageRoutingModule,
    SharedModule
  ],
  declarations: [PassengerTripsPage]
})
export class PassengerTripsPageModule {}
