import { Component, Input, Output, EventEmitter } from '@angular/core';
import {IUser} from '../users/user.model';


@Component({
  selector: 'account-menu',
  styleUrls: ['./account-menu.component.css'],
  template: `
    <div class="account">
      <span class="welcome" *ngIf="user">
        <a (click)="showMenu=!showMenu">
          Welcome {{user.firstName}}
          <span class="chevron">&#8964;</span>
        </a>
        <div class="menu" *ngIf="showMenu" (click)="signOut()">Sign Out</div>
      </span>
      <span *ngIf="!user"><a [routerLink]="['/users/sign-in']">Sign In</a></span>
      <span *ngIf="!user"><a [routerLink]="['/users/register']">Register</a></span>
    </div>`
})
export class AccountMenuComponent {
  @Input() user:IUser | null = null;
  @Output() signedOut: EventEmitter<undefined> = new EventEmitter<undefined>();
  showMenu: boolean = false ;

  signOut() {
    this.showMenu = false;
    this.signedOut.emit();
  }

}
