import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NavController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private generalService: GeneralService , private navCtrl: NavController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const pass = this.loginForm.get('pass')?.value;

    // Validación para 'admin', 'admin'
    if (email === 'admin' && pass === 'admin') {
      // Redirigir al Home directamente si es admin
      this.navCtrl.navigateRoot('/inicio');
    } else {
      // Realizar la solicitud al backend si no es admin
      const body = {
        email: email,
        pass: pass
      };

      this.generalService.post('api/auth/login', body).subscribe(
        (response) => {
          // Redirigir al Home si el login es exitoso
          console.log('Login exitoso:', response);
          this.navCtrl.navigateRoot('/inicio');
        },
        (error) => {
          // Manejar el error en caso de que las credenciales sean incorrectas
          console.error('Error en el login:', error);
          alert('Credenciales incorrectas');
        }
      );
    }
  }
}
