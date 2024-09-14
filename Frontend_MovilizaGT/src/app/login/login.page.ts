import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private navCtrl: NavController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    console.log('Login form', this.loginForm.value);
      this.navCtrl.navigateForward('/inicio');
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.validateLogin(email, password).subscribe((response) => {
        // Manejar la respuesta
        if (response.valid) {
          console.log('Login successful');
          // Redirigir o realizar alguna acción
        } else {
          console.log('Invalid credentials');
          // Mostrar mensaje de error
        }
      });
    }
  }
}
