import { Injectable } from '@angular/core';
import { StorageService } from '@pages/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<string>;
  public currentUser!: Observable<string>;

  constructor(private storage: StorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.storage.getData('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    return !!this.storage.getData('currentUser');
  }

  logout() {
    this.storage.removeData('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>({});
  }
}
