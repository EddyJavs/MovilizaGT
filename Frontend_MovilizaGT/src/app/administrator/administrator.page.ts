import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { UserModalComponent } from './user-modal.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.page.html',
  styleUrls: ['./administrator.page.scss'],
})
export class AdministratorPage implements OnInit {
  users: any[] = [];
  selectedStatus: string = '0'; // 0 para inactivo y 1 para activo

  constructor(private http: HttpClient, private modalController: ModalController) {}

  ngOnInit() {
    this.getUsersByStatus();
  }

  getUsersByStatus() {
    this.http
      .get<any[]>(`http://localhost:8080/api/auth/usersByAccountStatus?accountStatus=${this.selectedStatus}`)
      .subscribe((data) => {
        this.users = data;
      });
  }
//modal para visualizar fotos

async openModal(user: any, type: string) {
  const showImages = type === 'DPI'
    ? { photo: user.photo, dpiFront: user.dpiFront }
    : { dpiFront: user.dpiFront, licenseFront: user.licenseFront };

  const modal = await this.modalController.create({
    component: UserModalComponent,
    componentProps: {
      user,
      modalTitle: type === 'DPI' ? 'Validar Pasajero' : 'Validar Conductor',
      actionLabel: type === 'DPI' ? 'Activar Pasajero' : 'Activar Conductor',
      showImages,
      selectedStatus: this.selectedStatus, // Pasar el estado actual
    },
  });

  await modal.present();

  // Manejar el resultado del modal
  const { data } = await modal.onDidDismiss();
  if (data?.updated) {
    this.getUsersByStatus(); // Recargar la lista si hubo cambios
  }
}



}

  
  
  
  

