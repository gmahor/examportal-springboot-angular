import { LoginService } from 'src/app/services/login/login.service';
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
export class NormalGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.loginservice.isLoggedIn() &&
      this.loginservice.getUserRole() == 'NORMAL'
    ) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
