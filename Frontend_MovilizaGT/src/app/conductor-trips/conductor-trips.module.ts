import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorTripsPageRoutingModule } from './conductor-trips-routing.module';

import { ConductorTripsPage } from './conductor-trips.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorTripsPageRoutingModule,
    SharedModule
  ],
  declarations: [ConductorTripsPage]
})
export class ConductorTripsPageModule {}
