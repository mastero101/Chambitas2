import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {
  public progress = 0;
  ordenes: any [] = [];
  afiliados: any [] = [];
  no_servicio: any;
  id_afiliado: any;
  estado: any;
  nombre_afiliado: any;

  constructor() { 
    setInterval(() => {
      this.progress 
    }, 1000);
  }

  async ngOnInit() {
    await this.getOrdenes()
    this.getAfiliados();
  }

  async getOrdenes() {
    const url = 'https://masteros.cloud/ordenes';
    const id = 1; // ID deseado
  
    try {
      const response = await axios.get(url);
      this.ordenes = response.data;
  
      // Buscar el conjunto de datos por ID
      const orden = this.ordenes.find((orden) => orden.id === id);
  
      if (orden) {
        // Los datos de orden seleccionada están en la variable `orden`
        console.log(orden);
  
        this.no_servicio = orden.no_servicio;
        this.id_afiliado = orden.id_afiliado;
        this.estado = orden.estado;

         // Actualizar el progreso según el estado obtenido
         switch (this.estado) {
          case 'contacto':
            this.progress = 0.05;
            break;
          case 'cotizacion':
            this.progress = 0.25;
            break;
          case 'confirmacion':
            this.progress = 0.5;
            break;
          case 'trabajo':
            this.progress = 0.75;
            break;
          case 'terminado':
            this.progress = 1.0;
            break;
          default:
            this.progress = 0;
            break;
        }
      } else {
        console.log(`No se encontró ninguna orden con ID ${id}`);
      }
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  }
  
  async getAfiliados() {
    const url = 'https://masteros.cloud/afiliados';
    const id_af = Number(this.id_afiliado);
  
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
      } else {
        console.log(`No se encontró ningún afiliado con ID ${id_af}`);
      }
    } catch (error) {
      console.error('Error al obtener los afiliados:', error);
    }
  }

}
