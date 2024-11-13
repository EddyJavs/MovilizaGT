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
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
        email: ['', [Validators.required, Validators.email]],
        dpi: ['', Validators.required],
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18)]],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('pass')?.value || '';
    const confirmPassword = form.get('confirmPassword')?.value || '';
    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('pass')?.value || '';
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

  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[key] = file;
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('fullName', this.registerForm.get('fullName')?.value);
      formData.append('phone', this.registerForm.get('phone')?.value);
      formData.append('dpi', this.registerForm.get('dpi')?.value);
      formData.append('gender', this.registerForm.get('gender')?.value);
      formData.append('age', this.registerForm.get('age')?.value);
      formData.append('pass', this.registerForm.get('pass')?.value);
  
      // Archivos de imágenes
      formData.append('dpiFront', this.selectedFiles['dpiFront']);
      formData.append('dpiBack', this.selectedFiles['dpiBack']);
      formData.append('licenseFront', this.selectedFiles['licenseFront']);
      formData.append('licenseBack', this.selectedFiles['licenseBack']);
      formData.append('photo', this.selectedFiles['photo']);  // Asegúrate de agregar este campo si el backend lo espera
  
      this.generalService.postFormData('api/auth/register', formData).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.navCtrl.navigateRoot('/login');
        },
        error: (err) => {
          console.error('Error en el registro', err);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
  
}
