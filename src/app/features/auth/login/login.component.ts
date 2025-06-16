import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(
            error.error?.message || 'Error al iniciar sesión. Por favor, intente nuevamente.',
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
    } else {
      this.snackBar.open('Por favor complete todos los campos correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  }
} 