
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [
    {   
        path: '', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'graphics1', component: Graphics1Component, data: { titulo: 'Graphics 1' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'promesas', component:  PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component:  RxjsComponent, data: { titulo: 'Rxjs' } },

            // Mantenimientos
            { path: 'usuarios', component:  UsuariosComponent, data: { titulo: 'Usuarios de aplicación' } }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}