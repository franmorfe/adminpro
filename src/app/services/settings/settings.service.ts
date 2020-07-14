import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  }

  constructor( @Inject(DOCUMENT) private _document ) { 
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  loadSettings() {
    if (localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
      this.applyTheme( this.ajustes.theme );
    } 
  }

  applyTheme( theme: string ){

    let url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = url;

    this.saveSettings();
  }

}

interface Ajustes {
  themeUrl: string,
  theme: string
}
