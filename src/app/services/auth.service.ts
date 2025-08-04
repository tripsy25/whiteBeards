import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<IUser | null>(this.getCurrentUser());

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getCurrentUser(): IUser | null {
    const email = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    
    if (email && userId) {
      return { 
        userId,
        firstName: firstName || 'Admin',
        lastName: lastName || 'User',
        email,
        classes: []
      };
    }
    return null;
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        if (email === 'admin@whitebeards.com' && password === 'password123') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', '1');
          localStorage.setItem('firstName', 'Admin');
          localStorage.setItem('lastName', 'User');
          
          const user: IUser = { 
            userId: '1',
            firstName: 'Admin',
            lastName: 'User',
            email,
            classes: []
          };
          this.isLoggedInSubject.next(true);
          this.currentUserSubject.next(user);
          
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }
}