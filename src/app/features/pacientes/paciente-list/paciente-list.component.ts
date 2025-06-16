import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

interface Paciente {
  id: number;
  nombreMascota: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  tipoIdentificacionDueno: string;
  identificacionDueno: string;
  nombreDueno: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  fechaRegistro: string;
}

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'nombreMascota', 'especie', 'raza', 'fechaNacimiento',
    'tipoIdentificacionDueno', 'identificacionDueno',
    'nombreDueno', 'ciudad', 'direccion', 'telefono', 'fechaRegistro', 'acciones'
  ];
  dataSource = new MatTableDataSource<Paciente>();
  totalPacientes = 0;
  cantidadPorEspecie: { [key: string]: number } = {};
  especiesResumen = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro', 'Equino'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/pacientes').subscribe({
      next: response => {
        const pacientes = response.data || [];
        this.dataSource.data = pacientes.map((p: any) => ({
          id: p.id,
          ...p
        })).reverse();
        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 25;
        // Calcular totales
        this.totalPacientes = pacientes.length;
        this.cantidadPorEspecie = {};
        pacientes.forEach((p: any) => {
          const especie = p.especie || 'Otro';
          this.cantidadPorEspecie[especie] = (this.cantidadPorEspecie[especie] || 0) + 1;
        });
      },
      error: () => {
        this.dataSource.data = [];
        this.totalPacientes = 0;
        this.cantidadPorEspecie = {};
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarPaciente(id: number) {
    const paciente = this.dataSource.data.find(p => p.id === id);
    if (paciente) {
      this.router.navigate(['/pacientes/editar', paciente.identificacionDueno]);
    }
  }

  eliminarPaciente(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción eliminará el paciente de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>(`/api/pacientes/${this.dataSource.data.find(p => p.id === id)?.identificacionDueno}`).subscribe({
          next: () => {
            this.ngOnInit();
            Swal.fire('Eliminado', 'El paciente ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Error al eliminar el paciente', 'error');
          }
        });
      }
    });
  }

  nuevoPaciente() {
    this.router.navigate(['/pacientes/nuevo']);
  }
} 