import { Injectable } from '@angular/core';
import { Observable, Subject, EMPTY, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { concat } from 'lodash';

import { IUser } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  currentUser: IUser | null = null;

  constructor() { }

  saveUser(user: IUser): Observable<IUser> {
    let classes = user.classes || [];
    this.currentUser = {...user, classes: [...classes] };

    return EMPTY.pipe(delay(1000));
  }

  enroll(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Already enrolled'));

    this.currentUser = {...this.currentUser, classes: concat(this.currentUser.classes, classId)};

    return EMPTY.pipe(delay(1000));
  }

  drop(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (!this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Not enrolled'));

    this.currentUser = {
      ...this.currentUser,
      classes: this.currentUser.classes.filter((c: string) => c !== classId)
    };

    return EMPTY.pipe(delay(3000));
  }

  signIn(credentials: any): Observable<any> {
    //Never, ever check credentials in client-side code.
    //This code is only here to supply a fake endpoint for signing in.
    if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret')
      return throwError(() => new Error('Invalid login'));

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: []
    };

    return EMPTY;
  }
}


