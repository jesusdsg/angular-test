import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { StorageService } from 'src/pages/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService,
    private auth: AuthService
  ) {}
  /* Check if user is already logged */
  canActivate(): boolean {
    const currentUser = this.auth.isLoggedIn();
    if (!currentUser) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
