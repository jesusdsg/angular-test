import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/pages/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}
  /* Check if user is already logged */
  canActivate(): boolean {
    const currentUser = this.storage.getData('currentUser');
    //Logged
    if (!currentUser) {
      this.router.navigate(['']);
      console.log('Is not logged');
      return false;
    }
    //Not logged
    /*  this.router.navigate(['pages/login'], {
      queryParams: { returnUrl: state.url },
    }); */
    //this.router.navigate(['pages/login']);
    console.log('Is logged', currentUser);
    return true;
  }
}
