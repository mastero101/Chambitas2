import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  cardVisible: boolean = false;
  isCardExpanded: boolean = false;
  afiliados: any [] = [];
  map2: any;
  horario_completo: any;
  img: any;
  area_servicio: any;
  nombre_afiliado: any;
  profesion: any;
  clasificacion: any;
  precio: any;
  horario_servicio: any;
  horario_completo_formateado: any;
  estrellas: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const id = Number(params['id']); // Obtenemos el valor del 'id' de la URL
      this.getAfiliados(id);
    });
  }

  copiarTexto() {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = this.area_servicio;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    alert('Texto copiado');
  }

  openGoogleMaps() {
    const address = this.area_servicio;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
    window.open(url, '_system');
  }

  toggleCard() {
    this.cardVisible = !this.cardVisible;
    this.isCardExpanded = !this.isCardExpanded;
  }

  getAfiliados(id: number) {
    const url = 'https://masteros.cloud/afiliados';
  
    axios.get(url)
      .then(response => {
        this.afiliados = response.data;
  
        // Buscar el conjunto de datos por ID
        const afiliadoSeleccionado = this.afiliados.find(afiliado => afiliado.id === id);
  
        if (afiliadoSeleccionado) {
          // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
          console.log(afiliadoSeleccionado);

          this.img = afiliadoSeleccionado.img;
          this.nombre_afiliado = afiliadoSeleccionado.nombre_afiliado;
          this.profesion = afiliadoSeleccionado.profesion;
          this.clasificacion = afiliadoSeleccionado.clasificacion;
          this.precio = afiliadoSeleccionado.precio;
          this.area_servicio = afiliadoSeleccionado.area_servicio;
          this.horario_servicio = afiliadoSeleccionado.horario_servicio;

          this.horario_completo = afiliadoSeleccionado.horario_servicio_completo;
          const horarioFormateado = this.horario_completo.replace(/ pm/g, ' pm\n');
          this.horario_completo_formateado = horarioFormateado;
          
          this.estrellas = afiliadoSeleccionado.estrellas;
          console.log(this.estrellas);
        } else {
          console.log(`No se encontró ningún afiliado con ID ${id}`);
        }
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }
}
