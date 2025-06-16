import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit {
  pacienteForm: FormGroup;
  isEditMode = false;
  pacienteId: number | null = null;

  especies = [
    'Perro',
    'Gato',
    'Ave',
    'Reptil',
    'Equino',
    'Otro'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.pacienteForm = this.fb.group({
      nombreMascota: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: [''],
      fechaNacimiento: ['', [Validators.required]],
      tipoIdentificacionDueno: ['', [Validators.required]],
      identificacionDueno: ['', [Validators.required]],
      nombreDueno: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9-+()]*$')]],
      fechaRegistro: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.cargarPaciente(id);
    }
  }

  cargarPaciente(id: string) {
    this.http.get<any>(`/api/pacientes/${id}`).subscribe({
      next: response => {
        const paciente = response.data;
        if (paciente) {
          this.pacienteForm.patchValue({
            nombreMascota: paciente.nombreMascota,
            especie: paciente.especie,
            raza: paciente.raza,
            fechaNacimiento: paciente.fechaNacimiento,
            tipoIdentificacionDueno: paciente.tipoIdentificacionDueno,
            identificacionDueno: paciente.identificacionDueno,
            nombreDueno: paciente.nombreDueno,
            ciudad: paciente.ciudad,
            direccion: paciente.direccion,
            telefono: paciente.telefono,
            fechaRegistro: paciente.fechaRegistro
          });
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el paciente', 'error');
      }
    });
  }

  onSubmit() {
    if (this.pacienteForm.valid) {
      const paciente = {
        ...this.pacienteForm.value,
        fechaRegistro: new Date().toISOString().split('T')[0] // yyyy-MM-dd
      };

      if (this.isEditMode) {
        // Actualizar paciente existente
        this.http.put('/api/pacientes', paciente).subscribe({
          next: () => {
            Swal.fire('Actualizado', 'Paciente actualizado exitosamente', 'success');
            this.router.navigate(['/pacientes']);
          },
          error: (err) => {
            Swal.fire('Error', 'Error al actualizar paciente', 'error');
          }
        });
      } else {
        // Registrar nuevo paciente
        this.http.post('/api/pacientes', paciente).subscribe({
          next: () => {
            Swal.fire('Registrado', 'Paciente registrado exitosamente', 'success');
            this.router.navigate(['/pacientes']);
          },
          error: (err) => {
            Swal.fire('Error', 'Error al registrar paciente', 'error');
          }
        });
      }
    } else {
      Swal.fire('Campos incompletos', 'Por favor complete todos los campos requeridos', 'warning');
    }
  }

  cancelar() {
    this.router.navigate(['/pacientes']);
  }

  onIdentificacionDuenoBlur() {
    const identificacion = this.pacienteForm.get('identificacionDueno')?.value;
    if (identificacion) {
      this.http.get<any>(`/api/pacientes/${identificacion}`).subscribe({
        next: response => {
          const paciente = response.data;
          if (paciente) {
            this.pacienteForm.patchValue({
              nombreDueno: paciente.nombreDueno,
              ciudad: paciente.ciudad,
              direccion: paciente.direccion,
              telefono: paciente.telefono
            });
          } else {
            this.pacienteForm.patchValue({
              nombreDueno: '',
              ciudad: '',
              direccion: '',
              telefono: ''
            });
          }
        },
        error: () => {
          this.pacienteForm.patchValue({
            nombreDueno: '',
            ciudad: '',
            direccion: '',
            telefono: ''
          });
        }
      });
    }
  }
} 