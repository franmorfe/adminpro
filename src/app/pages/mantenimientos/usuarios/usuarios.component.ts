import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando =  true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina( valor: number ) {

    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }


    this.busquedasService.buscar( 'usuarios', termino )
          .subscribe( resultados => {
            this.usuarios = resultados;
          })
  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede eliminarse a sí mismo', 'error');
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario( usuario )
            .subscribe( resp => {
              this.cargarUsuarios();
              Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido borrado',
                'success'
              );
            });
      }
    })
  }

  cambiarRole( usuario: Usuario ) {
    this.usuarioService.guardarUsuario( usuario )
        .subscribe( resp => {
          console.log(resp);
        });
  }

  abrirModal( usuario: Usuario ) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.imagenUrl);
  }

}
