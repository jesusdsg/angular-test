import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { MenuModel } from 'src/models/layout/menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menu: MenuModel[] = [
    { name: 'About', link: '/' },
    { name: 'Dashboard', link: 'pages/dashboard' },
  ];

  constructor(public auth: AuthService, private router: Router) {}

  checkUser(): void {
    this.auth.currentUser.subscribe({
      next(user) {
        //console.log('User', user);
      },
      error(message) {
        console.error('Error: ', message);
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {
    this.checkUser();
  }
}
