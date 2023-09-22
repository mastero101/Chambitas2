import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
})
export class NavBarPage implements OnInit {
  mostrarBotonRecarga: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarBotonRecarga = this.router.url === '/home';
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
