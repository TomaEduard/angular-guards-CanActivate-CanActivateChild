import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, toArray } from 'rxjs/operators';

export enum Roles {
  'USER',
  'ADMIN',
  'MANAGER',
  'TEST',
  'TEST2'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private rol: BehaviorSubject<Roles[]> = new BehaviorSubject<Roles[]>([Roles.USER, Roles.ADMIN]);
  public rol$: Observable<Roles[]> = this.rol.asObservable();

  getAllRolesAsString(): string[] {
    return Object.values(Roles).filter(value => typeof value === 'string') as string[];
  }

  getUserRolesAsString(): string[] {
    let array: string[] = [];

    if (this.rol.getValue()) {
      this.rol.getValue().forEach((e: number) => {
        array.push(Roles[e]);
      })
    }

    return array;
  }

  isLoggedIn$(value?: boolean): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  isManager$(): Observable<boolean> {
    return of(this.rol.getValue().includes(Roles.MANAGER));
  }

  hasPermissions$(): Observable<boolean> {
    // return Observable base of JWT in LS and this.rol
    return of(true);
  }

  setRol(newRoles: Roles[]) {
    var arrayOfNumbers: any[] = [];

    newRoles.forEach((e: Roles) => {
      arrayOfNumbers.push(Roles[e]);
    });

    this.rol.next(arrayOfNumbers);
  }
}
