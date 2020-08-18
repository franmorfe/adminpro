import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario: Usuario;

  constructor( public _sidebar: SidebarService,
               private usuarioService: UsuarioService ) { 

      this.usuario = usuarioService.usuario;
  }
             
  logout() {
    this.usuarioService.logout();
  }
}
