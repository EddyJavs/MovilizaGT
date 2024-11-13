import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdministratorPageRoutingModule } from './administrator-routing.module';
import { AdministratorPage } from './administrator.page';
import { UserModalComponent } from './user-modal.component'; // Importa el componente aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorPageRoutingModule
  ],
  declarations: [
    AdministratorPage,
    UserModalComponent // Declara el componente aquí
  ]
})
export class AdministratorPageModule {}
