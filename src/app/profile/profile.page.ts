import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  direccion: string = "Av.Fundadores 4 Campeche,Campeche 24014";
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
