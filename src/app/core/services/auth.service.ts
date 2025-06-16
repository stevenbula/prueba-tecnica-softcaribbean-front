import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar si hay un token guardado al iniciar el servicio
    this.isAuthenticatedSubject.next(!!this.getToken());
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAuthenticatedSync(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 