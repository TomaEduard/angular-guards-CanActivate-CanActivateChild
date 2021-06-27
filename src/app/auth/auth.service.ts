import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private rol: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['USER', 'ADMIN']);
  public rol$: Observable<string[]> = this.rol.asObservable();

  isLoggedIn$(value?: boolean) {
    return of(true).pipe(delay(500));
  }

  isManager$() {
    return of(this.rol.getValue().includes('MANAGER'));
  }

  hasPermissions$() {
    // return Observable base of JWT in LS and this.rol
    return of(true);
  }


}
