import { Component, OnInit } from '@angular/core';
import { FileService } from '@pages/services/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  p: number = 1;
  constructor(public fileService: FileService) {
    this.fileService.currentFile.subscribe();
  }

  ngOnInit(): void {}
}
