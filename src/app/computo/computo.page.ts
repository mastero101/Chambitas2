import { Component, OnInit } from '@angular/core';

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
  
}
