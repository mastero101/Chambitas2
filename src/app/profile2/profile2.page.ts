import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  direccion: string = "Av. Francisco I. Madero 1, Villa del Río, Barrio de Sta Ana, 24010 Campeche, Camp.";
  cardVisible: boolean = false;
  isCardExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
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
}
