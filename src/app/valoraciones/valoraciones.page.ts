import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.page.html',
  styleUrls: ['./valoraciones.page.scss'],
})
export class ValoracionesPage implements OnInit {
  star1Selected: boolean = false;
  star2Selected: boolean = false;
  star3Selected: boolean = false;
  star4Selected: boolean = false;
  star5Selected: boolean = false;
  imagenAmpliada: boolean = false;
  imagenAmpliada2: boolean = false;
  imagenAmpliada3: boolean = false;
  imagenAmpliada4: boolean = false;
  imagenAmpliada5: boolean = false;
  imagenSeleccionada: string = '';
  imagenSeleccionada2: string = '';
  imagenSeleccionada3: string = '';
  imagenSeleccionada4: string = '';
  imagenSeleccionada5: string = '';

  constructor() { }

  ngOnInit() {
  }

  selectStar(starNumber: number) {
    switch (starNumber) {
      case 1:
        this.star1Selected = true;
        this.star2Selected = false;
        this.star3Selected = false;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 2:
        this.star1Selected = true;
        this.star2Selected = true;
        this.star3Selected = false;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 3:
        this.star1Selected = true;
        this.star2Selected = true;
        this.star3Selected = true;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 4:
        this.star1Selected = true;
        this.star2Selected = true;
        this.star3Selected = true;
        this.star4Selected = true;
        this.star5Selected = false;
        break;
      case 5:
        this.star1Selected = true;
        this.star2Selected = true;
        this.star3Selected = true;
        this.star4Selected = true;
        this.star5Selected = true;
        break;
    }
  }
  
  deselectStar(starNumber: number) {
    switch (starNumber) {
      case 1:
        this.star1Selected = false;
        this.star2Selected = false;
        this.star3Selected = false;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 2:
        this.star2Selected = false;
        this.star3Selected = false;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 3:
        this.star3Selected = false;
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 4:
        this.star4Selected = false;
        this.star5Selected = false;
        break;
      case 5:
        this.star5Selected = false;
        break;
    }
  }

  ampliarImagen(url: string) {
    this.imagenAmpliada = true;
    this.imagenSeleccionada = url;
  }

  ampliarImagen2(url: string) {
    this.imagenAmpliada2 = true;
    this.imagenSeleccionada2 = url;
  }

  ampliarImagen3(url: string) {
    this.imagenAmpliada3 = true;
    this.imagenSeleccionada3 = url;
  }

  ampliarImagen4(url: string) {
    this.imagenAmpliada4= true;
    this.imagenSeleccionada4 = url;
  }

  ampliarImagen5(url: string) {
    this.imagenAmpliada5 = true;
    this.imagenSeleccionada5 = url;
  }

  cerrarImagenAmpliada() {
    this.imagenAmpliada = false;
  }

  cerrarImagenAmpliada2() {
    this.imagenAmpliada2 = false;
  }

  cerrarImagenAmpliada3() {
    this.imagenAmpliada3 = false;
  }

  cerrarImagenAmpliada4() {
    this.imagenAmpliada4 = false;
  }

  cerrarImagenAmpliada5() {
    this.imagenAmpliada5 = false;
  }
}
