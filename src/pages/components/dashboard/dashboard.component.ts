import { Component, OnInit } from '@angular/core';
import { FileService } from '@pages/services/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public fileService: FileService) {}

  ngOnInit(): void {}
}
