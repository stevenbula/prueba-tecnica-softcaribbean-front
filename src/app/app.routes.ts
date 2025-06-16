import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PacienteListComponent } from './features/pacientes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './features/pacientes/paciente-form/paciente-form.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'pacientes/nuevo', component: PacienteFormComponent },
  { path: 'pacientes/editar/:id', component: PacienteFormComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: '**', redirectTo: '/login' }
]; 