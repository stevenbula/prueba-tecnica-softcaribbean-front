import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PacienteListComponent } from './features/pacientes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './features/pacientes/paciente-form/paciente-form.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes', 
    component: PacienteListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/nuevo', 
    component: PacienteFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pacientes/editar/:id', 
    component: PacienteFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'configuracion', 
    component: ConfiguracionComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 