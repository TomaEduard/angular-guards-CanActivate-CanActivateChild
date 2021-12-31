import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export enum Roles {
  'USER',
  'ADMIN',
  'MANAGER',
  'CUSTOMER',
  'CLIENT',
  'TEST',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private _rol: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([Roles[Roles.USER], Roles[Roles.ADMIN]]);
  public rol$: Observable<string[]> = this._rol.asObservable();

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  get rol(): string[] {
    return this._rol.getValue();
  }

  set rol(rolesList: string[]) {
    this._rol.next(rolesList);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  getAllRolesAsString(): string[] {
    return Object.values(Roles).filter(value => typeof value === 'string') as string[];
  }

  isAdmin$(): Observable<boolean> {
    return of(this.rol.includes(Roles[Roles.ADMIN]));
  }

  isAdminAndLogged$(): Observable<boolean> {
    return of(this.rol.includes(Roles[Roles.ADMIN]) && this.isLoggedIn);
  }

  isManager$(): Observable<boolean> {
    return of(this.rol.includes(Roles[Roles.MANAGER]));
  }

  isManagerAndLogged$(): Observable<boolean> {
    return of(this.rol.includes(Roles[Roles.MANAGER]) && this.isLoggedIn);
  }

  loginOrLogout() {
  }

}
