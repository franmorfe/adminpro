import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string = 'no-img';
  private _ocultarModal: boolean = true;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img?: string
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
