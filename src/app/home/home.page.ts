import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  afiliados: any[] = [];
  afiliadosOriginales: any[] = [];
  mostrandoResultados: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerAfiliados();
  }

  async obtenerAfiliados() {
    try {
      this.afiliados = await this.apiService.getAfiliados();
      this.afiliadosOriginales = this.afiliados;
    } catch (error) {
      console.error('Error al obtener los afiliados:', error);
    }
  }

  buscar(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
  
    if (!textoBusqueda.trim()) {
      // Restablece la lista de afiliados originales cuando no hay texto de búsqueda
      this.afiliados = [...this.afiliadosOriginales];
      this.mostrandoResultados = false; // Ocultar la lista si no hay texto de búsqueda
    } else {
      // Filtra los afiliados que coincidan con el texto de búsqueda
      this.afiliados = this.afiliadosOriginales.filter(afiliado => {
        const nombre = afiliado.nombre_afiliado.toLowerCase();
        const profesion = afiliado.profesion.toLowerCase();
        return nombre.includes(textoBusqueda) || profesion.includes(textoBusqueda);
      });
      this.mostrandoResultados = true; // Mostrar la lista si hay resultados de búsqueda
    }
    console.log(this.afiliados);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
