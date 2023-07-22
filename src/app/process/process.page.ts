import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

import { ApiService } from '../api.service';

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
  telefono: any;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { 
    setInterval(() => {
      this.progress 
    }, 1000);
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const id = Number(params['id']); // Obtenemos el valor del 'id' de la URL
      await this.getOrdenes(id);
      this.getAfiliados();
    });
  }

  async getOrdenes(id: number) {
  
    try {
      const ordenes = await this.apiService.getOrdenes();
      // Buscar el conjunto de datos por ID
      const orden = ordenes!.find((orden) => orden.id === id);
  
      if (orden) {
        // Los datos de la orden seleccionada están en la variable `orden`
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
        this.telefono = afiliadoSeleccionado.telefono;
      } else {
        console.log(`No se encontró ningún afiliado con ID ${id_af}`);
      }
    } catch (error) {
      console.error('Error al obtener los afiliados:', error);
    }
  }

}
