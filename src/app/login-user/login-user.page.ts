import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
})
export class LoginUserPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  
  onSubmit() {
    this.authService.login(this.usuario, this.contrasena)
    .then((response) => {
      // Verifica el resultado del backend y toma acciones en consecuencia
      if (response.data.message === 'Login successful') {
        console.log("Inicio Exitoso");
        alert("Login Successful")
        this.router.navigate(['/home']);
      } else {
        console.log('Error de autenticación:', response.data.message);
      }
    })
    .catch((error) => {
      console.log('Error de autenticación:', error);
      alert("Error de Inicio de Sesion, usuario o contraseña incorrectos");
    });
  }
}
