import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('PERMISIE PARINTE');

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
      
      return false;
  }
}
