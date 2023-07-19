import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {
  public progress = 0;

  constructor() { 
    setInterval(() => {
      this.progress += 0.25;
    }, 1000);
  }

  ngOnInit() {
  }

}
