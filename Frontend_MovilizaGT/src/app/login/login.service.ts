// user.service.ts
import { Injectable } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiService: GeneralService) {}

  // Ejemplo de método para obtener usuarios
  getUsers(params?: { [key: string]: string | number | boolean }): Observable<any> {
    return this.apiService.get('users', params);
  }

  // Ejemplo de método para crear un usuario
  createUser(userData: any): Observable<any> {
    return this.apiService.post('users', userData);
  }

  // Ejemplo de método para eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    return this.apiService.delete(`users/${userId}`);
  }

  validateLogin(username: string, password: string): Observable<{ valid: boolean }> {
    const params = { username, password };
    return this.apiService.get<{ valid: boolean }>('login/validate', params);
  }
}
