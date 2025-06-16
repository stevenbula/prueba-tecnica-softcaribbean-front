import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../../material.module';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule
  ],
  exports: [
    PacienteListComponent,
    PacienteFormComponent
  ]
})
export class PacientesModule { } 