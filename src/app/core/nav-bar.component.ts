import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserRepositoryService } from "../services/user-repository.service";
import { AuthService } from "../services/auth.service";
import { IUser } from "../users/user.model";

@Component({
  selector: 'wb-nav-bar',
  styleUrls: [`./nav-bar.component.css`],
  template: `
    <div class="nav-bar" *ngIf="isLoggedIn$ | async">
      <img class="logo" src="/assets/images/whitebeard-logo.png" alt="Whitebeard Logo" />
      <div class="nav-item"><a [routerLink]="['/catalog']">Catalog</a></div>
      <account-menu [user]="currentUser$ | async" (signedOut)="handleSignOut()"></account-menu>
    </div>
`
})

export class NavBarComponent  {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<IUser | null>;

  constructor(
    private userRepository: UserRepositoryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  get currentUser() {
    return this.userRepository.currentUser;
  }

  handleSignOut() {
    this.userRepository.currentUser = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
