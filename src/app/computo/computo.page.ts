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
  star1Selected2: boolean = false;
  star2Selected2: boolean = false;
  star3Selected2: boolean = false;
  star4Selected2: boolean = false;
  star5Selected2: boolean = false;
  star1Selected3: boolean = false;
  star2Selected3: boolean = false;
  star3Selected3: boolean = false;
  star4Selected3: boolean = false;
  star5Selected3: boolean = false;
  star1Selected4: boolean = false;
  star2Selected4: boolean = false;
  star3Selected4: boolean = false;
  star4Selected4: boolean = false;
  star5Selected4: boolean = false;
  estrellas1: number = 0;
  afiliados: any [] = [];
  afiliado1: any;
  afiliado2: any;
  afiliado3: any;

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
  
  getAfiliados() {
    const url = 'https://masteros.cloud/afiliados';

    axios.get(url)
      .then(response => {
        this.afiliados = response.data;

        // Filtrar afiliados por ID 1
      this.afiliado1 = this.afiliados.find(afiliado => afiliado.id === 1);
      if (this.afiliado1) {
        const estrellas = parseFloat(this.afiliado1.estrellas);
        this.star1Selected = estrellas >= 1;
        this.star2Selected = estrellas >= 2;
        this.star3Selected = estrellas >= 3;
        this.star4Selected = estrellas >= 4;
        this.star5Selected = estrellas >= 5;
      }

      this.afiliado2 = this.afiliados.find(afiliado => afiliado.id === 2);
      if (this.afiliado2) {
        const estrellas = parseFloat(this.afiliado2.estrellas);
        this.star1Selected2 = estrellas >= 1;
        this.star2Selected2 = estrellas >= 2;
        this.star3Selected2 = estrellas >= 3;
        this.star4Selected2 = estrellas >= 4;
        this.star5Selected2 = estrellas >= 5;
      }

      this.afiliado3 = this.afiliados.find(afiliado => afiliado.id === 3);
      if (this.afiliado3) {
        const estrellas = parseFloat(this.afiliado3.estrellas);
        this.star1Selected3 = estrellas >= 1;
        this.star2Selected3 = estrellas >= 2;
        this.star3Selected3 = estrellas >= 3;
        this.star4Selected3 = estrellas >= 4;
        this.star5Selected3 = estrellas >= 5;
      }

        console.log(this.afiliados);
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }
}
