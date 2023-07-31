import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { UploadCardComponent } from './components/upload-card/upload-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CardComponent,
    NavbarComponent,
    UploadCardComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CardComponent,
    NavbarComponent,
    UploadCardComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
