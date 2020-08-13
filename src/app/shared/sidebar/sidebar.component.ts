import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor( public _sidebar: SidebarService,
               private usuarioService: UsuarioService ) { }
             
  logout() {
    this.usuarioService.logout();
  }
}
