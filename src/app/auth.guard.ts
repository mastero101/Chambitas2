import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    // Aquí implementa la lógica de autenticación
    // Por ejemplo, verifica si el usuario está autenticado
    // Si el usuario está autenticado, devuelve true, de lo contrario, redirige a la página de inicio de sesión.
    if (usuarioEstaAutenticado) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
  
}
