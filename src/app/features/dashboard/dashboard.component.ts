import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'Pacientes', icon: 'pets', count: 0, color: '#1976d2' },
    { title: 'Perros', icon: 'pets', count: 0, color: '#388e3c' },
    { title: 'Gatos', icon: 'pets', count: 0, color: '#f57c00' },
    { title: 'Aves', icon: 'pets', count: 0, color: '#7b1fa2' },
    { title: 'Reptiles', icon: 'pets', count: 0, color: '#0097a7' },
    { title: 'Equinos', icon: 'pets', count: 0, color: '#795548' },
    { title: 'Otros', icon: 'pets', count: 0, color: '#8bc34a' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/pacientes').subscribe({
      next: response => {
        const pacientes = response.data || [];
        this.cards[0].count = pacientes.length;
        this.cards[1].count = pacientes.filter((p: any) => p.especie === 'Perro').length;
        this.cards[2].count = pacientes.filter((p: any) => p.especie === 'Gato').length;
        this.cards[3].count = pacientes.filter((p: any) => p.especie === 'Ave').length;
        this.cards[4].count = pacientes.filter((p: any) => p.especie === 'Reptil').length;
        this.cards[5].count = pacientes.filter((p: any) => p.especie === 'Equino').length;
        this.cards[6].count = pacientes.filter((p: any) => !['Perro','Gato','Ave','Reptil','Equino'].includes(p.especie)).length;
      },
      error: () => {
        this.cards.forEach(card => card.count = 0);
      }
    });
  }
} 