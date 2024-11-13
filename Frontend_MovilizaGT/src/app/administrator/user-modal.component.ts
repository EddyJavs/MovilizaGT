import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styles: [
    `
      .image-container {
        display: flex;
        justify-content: space-around;
        padding: 16px;
      }
      img {
        width: 45%;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      .modal-footer {
        display: flex;
        justify-content: space-between;
        padding: 16px;
      }
    `,
  ],
})
export class UserModalComponent {
  @Input() user: any; // Los datos del usuario, incluido userId
  @Input() modalTitle: string = ''; // Título del modal
  @Input() actionLabel: string = ''; // Texto del botón de acción
  @Input() showImages: { photo?: string; dpiFront?: string; licenseFront?: string } = {};
  @Input() selectedStatus: string = ''; // El estado actual seleccionado del usuario

  constructor(private modalController: ModalController, private http: HttpClient) {}

  close() {
    this.modalController.dismiss();
  }

  activateUser() {
    // Determinar el nuevo estado en función de la lógica especificada
    let newStatus: number;

    if (this.selectedStatus === '0') {
      // Si el estado es '0', determinar según el título del modal
      newStatus = this.modalTitle === 'Validar Pasajero' ? 2 : 1;
    } else {
      // Si no es '0', actualizar a estado 3 (bloqueado/deshabilitado)
      newStatus = 3;
    }

    // Crear el cuerpo de la solicitud con los datos del usuario
    const requestBody = {
      userId: this.user.userId, // El ID del usuario
      accountStatus: newStatus, // El nuevo estado
    };

    // Llamar al backend con los datos generados
    this.http
      .post('http://localhost:8080/api/auth/updateAccountStatus', requestBody)
      .subscribe(
        (response: any) => {
          console.log('Estado actualizado con éxito:', response);
          this.modalController.dismiss({ updated: true }); // Cerrar el modal e informar éxito
        },
        (error) => {
          console.error('Error al actualizar el estado:', error);
          this.modalController.dismiss({ updated: false }); // Cerrar el modal e informar error
        }
      );
  }
}
