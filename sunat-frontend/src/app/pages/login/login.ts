import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  ruc: string = '20123456789';
  usuario: string = 'AMBICHO';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = {
      ruc: this.ruc,
      usuario: this.usuario,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Guardamos el token real y los datos del usuario devueltos por Spring Boot y Neon
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        
        // Redirigimos a la siguiente vista de recursos impugnatorios
        this.router.navigate(['/recursos-impugnatorios']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas o usuario no registrado en la Base de Datos.';
        alert(this.errorMessage);
      }
    });
  }
}