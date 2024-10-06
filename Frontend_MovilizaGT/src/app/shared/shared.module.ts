// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    NotificationComponent // Declara el componente aquí
  ],
  imports: [
    CommonModule // Puedes agregar FormsModule u otros módulos si es necesario
  ],
  exports: [
    NotificationComponent // Exporta el componente para que pueda ser utilizado en otros módulos
  ]
})
export class SharedModule { }