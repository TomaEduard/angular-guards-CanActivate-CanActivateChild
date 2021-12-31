import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): 
    boolean | 
    UrlTree | 
    Observable<boolean | UrlTree> | 
    Promise<boolean | UrlTree> {

    console.log('CanLoad', route.data);

    return this.auth
      .isLoggedIn$
      .pipe(map((isLoggedIn) => isLoggedIn || this.router.createUrlTree([''])));
  }

}
