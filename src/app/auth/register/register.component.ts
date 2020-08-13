import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ 'register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre: ['Test17', Validators.required],
    email: ['test17@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.required]

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(  public router: Router,
                private fb: FormBuilder,
                private UsuarioService: UsuarioService ) { }

  crearUsuario() {
    this.formSubmitted = true;
    
    if ( this.registerForm.invalid ){
      return;
    } 

    this.UsuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          this.router.navigateByUrl('/dashboard');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });


  }

  campoNoValido( campo: string ): boolean {
    if( this.formSubmitted && this.registerForm.get(campo).invalid) {
      return true;
    } else {
      return false;
    }
  }

  passwordsNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( this.formSubmitted && pass1 !== pass2 ){ 
      return true;
    } else {
      return false;
    }
    
  }

  aceptaTerminos() {
    return this.formSubmitted && !this.registerForm.get('terminos').value;
  }

  passwordsIguales( pass1: string, pass2:string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

}
