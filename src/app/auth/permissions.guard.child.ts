import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuardChild implements CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    // console.log('state.url', state.url);
    // console.log('state.toString', state.toString);
    
    // if (route.data && 'auth' in route.data) {
    if (!route.data && !route.data['auth']) {
      console.log('Nu am primit rolurile permise', );
      return false;
    }

    for (const rol of this.auth.rol) {
      if (route.data.auth.includes(rol)) {
        console.log('AVEM DREPTUL 🟢', );
        return true;
      }
    }
    
    return of(false)
      .pipe(
        tap(_ => {
          this.router.navigateByUrl('/home');
        })
      );

  }
}
