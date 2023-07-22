import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  no_servicio!: string;
  id_afiliado!: number;
  estado!: string;
  nombre_afiliado!: string;
  telefono!: string;
  img!: string;

  no_servicio2!: string;
  id_afiliado2!: number;
  estado2!: string;
  nombre_afiliado2!: string;
  telefono2!: string;
  img2!: string;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    // Obtener todas las órdenes y afiliados
    const ordenes = await this.apiService.getOrdenes();
    const afiliados = await this.apiService.getAfiliados();

    // Obtener la primera orden y afiliado
    const ordenData = ordenes && ordenes.length > 0 ? ordenes[0] : null;
    const afiliadoData = afiliados && afiliados.length > 0 ? afiliados[0] : null;

    if (ordenData) {
      this.no_servicio = ordenData.no_servicio;
      this.id_afiliado = ordenData.id_afiliado;
      this.estado = ordenData.estado;
    }

    if (afiliadoData) {
      this.nombre_afiliado = afiliadoData.nombre_afiliado;
      this.telefono = afiliadoData.telefono;
      this.img = afiliadoData.img;
    }

    // Obtener la segunda orden y afiliado
    if (ordenes && ordenes.length > 1) {
      const ordenData2 = ordenes[1];
      this.no_servicio2 = ordenData2.no_servicio;
      this.id_afiliado2 = ordenData2.id_afiliado;
      this.estado2 = ordenData2.estado;
    }

    if (afiliados && afiliados.length > 1) {
      const afiliadoData2 = afiliados[1];
      this.nombre_afiliado2 = afiliadoData2.nombre_afiliado;
      this.telefono2 = afiliadoData2.telefono;
      this.img2 = afiliadoData2.img;
    }
  }
}
