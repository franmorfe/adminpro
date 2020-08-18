import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imageToUpload: File;
  public imgTemp: any =  null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 
      
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required ],
      email: [this.usuario.email, [ Validators.required, Validators.email ] ]
    });

  }

  actualizarPerfil() {
    console.log(this.profileForm.value);
    this.usuarioService.actualizarPerfil( this.profileForm.value )
        .subscribe( () => {
          const { nombre, email } = this.profileForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Su perfil se ha actualizado', 'success');
        }, (err) => {
          Swal.fire('Ooops!', err.error.msg, 'error');
        });
  }

  cambiarImagen( file: File ) {
    this.imageToUpload = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto( this.imageToUpload, 'usuarios', this.usuario.uid )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        Swal.fire('Ooops!', 'No se pudo actualizar la imagen', 'error');
      });
  }

}
