import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  direccion: string = "Av. Francisco I. Madero 1, Villa del Río, Barrio de Sta Ana, 24010 Campeche, Camp.";
  cardVisible: boolean = false;
  isCardExpanded: boolean = false;
  afiliados: any [] = [];
  map: any;
  map2: any;
  nombre_afiliado: any;
  profesion: any;
  clasificacion: any;
  precio: any;
  estrellas: any;
  horario_servicio: any;
  horario_completo: any;
  img: any;

  constructor() { }

  ngOnInit() {
    this.getAfiliados();
  }

  copiarTexto() {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = this.direccion;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    alert('Texto copiado');
  }

  openGoogleMaps() {
    const address = this.direccion;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
    window.open(url, '_system');
  }

  toggleCard() {
    this.cardVisible = !this.cardVisible;
    this.isCardExpanded = !this.isCardExpanded;
  }

  getAfiliados() {
    const url = 'https://masteros.cloud/afiliados';
    const id = 2; // ID deseado
  
    axios.get(url)
      .then(response => {
        this.afiliados = response.data;
  
        // Buscar el conjunto de datos por ID
        const afiliadoSeleccionado = this.afiliados.find(afiliado => afiliado.id === id);
  
        if (afiliadoSeleccionado) {
          // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
          console.log(afiliadoSeleccionado);

          this.map = afiliadoSeleccionado.area_servicio;

          this.horario_completo = afiliadoSeleccionado.horario_servicio_completo;
          const horarioFormateado = this.horario_completo.replace(/ pm/g, ' pm\n');
          this.map2 = horarioFormateado;

          this.nombre_afiliado = afiliadoSeleccionado.nombre_afiliado;
          this.img = afiliadoSeleccionado.img;
          this.profesion = afiliadoSeleccionado.profesion;
          this.clasificacion = afiliadoSeleccionado.clasificacion;
          this.horario_servicio = afiliadoSeleccionado.horario_servicio;
          this.precio = afiliadoSeleccionado.precio;
          this.estrellas = afiliadoSeleccionado.estrellas;
        } else {
          console.log(`No se encontró ningún afiliado con ID ${id}`);
        }
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }
}
