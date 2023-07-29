import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/pages/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}
  /* Check if user is already logged */
  canActivate(): boolean {
    const currentUser = this.storage.getData('currentUser');

    if (!currentUser) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
