import { Component, OnInit } from '@angular/core';
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
  map: any;
  map2: any;

  constructor() { }

  ngOnInit() {
    this.getAfiliados();
  }

  copiarTexto() {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = this.map;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    alert('Texto copiado');
  }

  openGoogleMaps() {
    const address = this.map;
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
    const id = 1; // ID deseado
  
    axios.get(url)
      .then(response => {
        this.afiliados = response.data;
  
        // Buscar el conjunto de datos por ID
        const afiliadoSeleccionado = this.afiliados.find(afiliado => afiliado.id === id);
  
        if (afiliadoSeleccionado) {
          // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
          console.log(afiliadoSeleccionado);

          this.map = afiliadoSeleccionado.area_servicio;
          this.map2 = afiliadoSeleccionado.horario_servicio_completo;
        } else {
          console.log(`No se encontró ningún afiliado con ID ${id}`);
        }
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }
}
