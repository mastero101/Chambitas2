import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  ordenes: any [] = [];
  afiliados: any [] = [];

  no_servicio: any;
  id_afiliado: any;
  estado: any;
  nombre_afiliado: any;
  telefono: any;
  img: any;

  no_servicio2: any;
  id_afiliado2: any;
  estado2: any;
  nombre_afiliado2: any;
  telefono2: any;
  img2: any;

  constructor() { }

  async ngOnInit() {
    await this.getOrdenes()
    this.getAfiliados();
  }

  async getOrdenes() {
    const url = 'https://masteros.cloud/ordenes';
    const id = 1; // ID deseado
    const id2 = 2;

    try {
      const response = await axios.get(url);
      this.ordenes = response.data;
  
      // Buscar el conjunto de datos por ID 1
      const orden = this.ordenes.find((orden) => orden.id === id);
  
      if (orden) {
        // Los datos de orden seleccionada están en la variable `orden`
        console.log(orden);
  
        this.no_servicio = orden.no_servicio;
        this.id_afiliado = orden.id_afiliado;
        this.estado = orden.estado;
      } else {
        console.log(`No se encontró ninguna orden con ID ${id}`);
      }

      // Buscar el conjunto de datos por ID 2
      const orden2 = this.ordenes.find((orden) => orden.id === id2);

      if (orden2) {
        // Los datos de orden seleccionada están en la variable `orden`
        console.log(orden2);
  
        this.no_servicio2 = orden2.no_servicio;
        this.id_afiliado2 = orden2.id_afiliado;
        this.estado2 = orden2.estado;
      } else {
        console.log(`No se encontró ninguna orden con ID ${id2}`);
      }
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  }
  
  async getAfiliados() {
    const url = 'https://masteros.cloud/afiliados';
    const id_af = Number(this.id_afiliado);
    const id_af2 = Number(this.id_afiliado2);
  
    try {
      const response = await axios.get(url);
      this.afiliados = response.data;
  
      // Buscar el conjunto de datos por ID
      const afiliadoSeleccionado = this.afiliados.find(
        (afiliado) => afiliado.id === id_af
      );
  
      if (afiliadoSeleccionado) {
        // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
        console.log(afiliadoSeleccionado);
  
        this.nombre_afiliado = afiliadoSeleccionado.nombre_afiliado;
        this.telefono = afiliadoSeleccionado.telefono;
        this.img = afiliadoSeleccionado.img;
      } else {
        console.log(`No se encontró ningún afiliado con ID ${id_af}`);
      }

      // Buscar el conjunto de datos por ID
      const afiliadoSeleccionado2 = this.afiliados.find(
        (afiliado) => afiliado.id === id_af2
      );
  
      if (afiliadoSeleccionado2) {
        // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
        console.log(afiliadoSeleccionado2);
  
        this.nombre_afiliado2 = afiliadoSeleccionado2.nombre_afiliado;
        this.telefono2 = afiliadoSeleccionado2.telefono;
        this.img2 = afiliadoSeleccionado2.img;
      } else {
        console.log(`No se encontró ningún afiliado con ID ${id_af}`);
      }

    } catch (error) {
      console.error('Error al obtener los afiliados:', error);
    }
  }
  
}
