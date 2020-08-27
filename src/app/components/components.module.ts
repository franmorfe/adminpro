import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonutComponent } from './grafico-donut/grafico-donut.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonutComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonutComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }