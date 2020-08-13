import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { timestamp, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private UsuarioService: UsuarioService,
               private router: Router ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.UsuarioService.validarToken()
        .pipe(
          tap( usuarioAutenticado => {
            if ( !usuarioAutenticado ) {
              this.router.navigateByUrl('/login');
            }
          })
        );
  }
}
