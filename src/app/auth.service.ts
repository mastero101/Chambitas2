import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_Url = 'https://masteros.cloud'; // Cambia esta URL con la URL real de tu backend

  constructor() { }

  login(usuario: string, contrasena: string) {
    const formData = { id_usuario: usuario, password: contrasena };
    return axios.post(`${this.auth_Url}/auth`, formData);
  }
}
