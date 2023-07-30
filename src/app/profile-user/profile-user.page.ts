import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {
  ordenes: any [] = [];
  nombre: any;
  id_usuario: any;
  telefono: any;
  direccion: any;
  img: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const id = 1;
  
    try {
      const ordenes = await this.apiService.getUsuarios();
      // Buscar el conjunto de datos por ID
      const orden = ordenes!.find((orden) => orden.id === id);
  
      if (ordenes) {
        // Los datos de la orden seleccionada están en la variable `orden`
        console.log(ordenes);
  
        this.nombre = orden.nombre;
        this.img = orden.img;
        this.id_usuario = orden.id_usuario;
        this.direccion = orden.direccion;
        this.telefono = orden.telefono;
  
      } else {
        console.log(`No se encontró ninguna orden con ID ${id}`);
      }
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  }

}
