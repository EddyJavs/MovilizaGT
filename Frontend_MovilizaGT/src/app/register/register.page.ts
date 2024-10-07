import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../services/general.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordStrengthText: string = '';
  passwordStrengthColor: string = 'medium';

  constructor(private fb: FormBuilder, private generalService: GeneralService, private navCtrl: NavController) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      dpi: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      dpi: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  // Validador para asegurarse de que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    console.log(form);
    const password = form.get('pass')?.value || '';
    const confirmPassword = form.get('confirmPassword')?.value || '';
    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('pass')?.value || '';
    console.log(password);
    if (password.length < 6) {
      this.passwordStrengthText = 'Débil';
      this.passwordStrengthColor = 'danger';
    } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      this.passwordStrengthText = 'Fuerte';
      this.passwordStrengthColor = 'success';
    } else {
      this.passwordStrengthText = 'Media';
      this.passwordStrengthColor = 'warning';
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const formData = this.registerForm.value;

      // Usamos el servicio general para enviar los datos al backend
      this.generalService.post<any>('api/auth/register', formData).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          // Redirigir a otra página después del registro exitoso
          this.navCtrl.navigateRoot('/login');
        },
        error: (err) => {
          console.error('Error en el registro', err);
        }
      });
    } else {
      console.log('Formulario inválido');
    }

  }

  uploadLicenseFront() {
    // Lógica para subir la imagen de la licencia (frente)
  }

  uploadLicenseBack() {
    // Lógica para subir la imagen de la licencia (reverso)
  }

  uploadDpiFront() {
    // Lógica para subir la imagen del DPI (frente)
  }

  uploadDpiBack() {
    // Lógica para subir la imagen del DPI (reverso)
  }
}
