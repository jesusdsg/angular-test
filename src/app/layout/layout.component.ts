import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor(
    private cdRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    console.log("Hi I'm the layout :)")
  }
}
