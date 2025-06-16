import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  logout() {
    this.authService.logout();
  }

  exportarExcel() {
    this.http.get('/api/pacientes/excel/exportar', { responseType: 'blob' }).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pacientes.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        Swal.fire('Exportado', 'Datos exportados exitosamente', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Error al exportar los datos', 'error');
      }
    });
  }

  importarExcel() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        this.http.post('/api/pacientes/excel/importar', formData).subscribe({
          next: () => {
            Swal.fire('Importado', 'Datos importados exitosamente', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Error al importar los datos', 'error');
          }
        });
      }
    };
    input.click();
  }
} 