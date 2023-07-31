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

  logout(): void {
    this.auth.logout();
    window.location.reload();
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {}
}
