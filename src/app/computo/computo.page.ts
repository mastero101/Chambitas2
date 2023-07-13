import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-computo',
  templateUrl: './computo.page.html',
  styleUrls: ['./computo.page.scss'],
})
export class ComputoPage implements OnInit {
  star1Selected: boolean = false;
  star2Selected: boolean = false;
  star3Selected: boolean = false;
  star4Selected: boolean = false;
  star5Selected: boolean = false;
  estrellas1: number = 0;
  afiliados: any [] = [];
  afiliado1: any;
  afiliado2: any;

  constructor() { }

  ngOnInit() {
    this.getAfiliados();
  }

  selectStar(estrellas: number) {
    this.estrellas1 = estrellas;
    this.updateStarSelection();
  }

  updateStarSelection() {
    this.star1Selected = this.estrellas1 >= 1;
    this.star2Selected = this.estrellas1 >= 2;
    this.star3Selected = this.estrellas1 >= 3;
    this.star4Selected = this.estrellas1 >= 4;
    this.star5Selected = this.estrellas1 >= 5;
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
  
  getAfiliados() {
    const url = 'http://192.168.0.32:3000/afiliados';

    axios.get(url)
      .then(response => {
        this.afiliados = response.data;

        // Filtrar afiliados por ID 1
      this.afiliado1 = this.afiliados.find(afiliado => afiliado.id === 1);
      this.afiliado2 = this.afiliados.find(afiliado => afiliado.id === 2);

        console.log(this.afiliados);
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }
}
