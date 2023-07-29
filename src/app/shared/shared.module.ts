import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { UploadCardComponent } from './components/upload-card/upload-card.component';

@NgModule({
  declarations: [CardComponent, NavbarComponent, UploadCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardComponent, NavbarComponent, UploadCardComponent],
})
export class SharedModule {}
