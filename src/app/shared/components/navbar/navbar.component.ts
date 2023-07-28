import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/models/layout/menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menu: MenuModel[] = [
    { name: 'Home', link: '/' },
    { name: 'Dashboard', link: '/dashboard' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
