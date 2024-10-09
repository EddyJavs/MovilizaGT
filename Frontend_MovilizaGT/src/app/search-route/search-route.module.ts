import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchRoutePageRoutingModule } from './search-route-routing.module';

import { SearchRoutePage } from './search-route.page';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRoutePageRoutingModule,
    SharedModule,
    ReactiveFormsModule, 
    
  ],
  declarations: [SearchRoutePage]
})
export class SearchRoutePageModule {}
