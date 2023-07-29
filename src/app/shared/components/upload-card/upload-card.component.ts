import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss']
})
export class UploadCardComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() fileInfo!: string;
  constructor() {
    this.fileInfo = 'Drag & drop files here'
   }

  ngOnInit(): void {
  }

   onDragOver(event: any) {
    event.preventDefault();
    console.log('onDragover')
  }
  // From drag and drop
  onDropSuccess(event: any) {
    event.preventDefault(); console.log('Success', event.dataTransfer.files[0])
    //this.sendFile(event.dataTransfer.files[0]);
  }
  // From attachment link
  onChange(event: any) { console.log('Change')
   // this.sendFile(event.target.files[0]);
  }

  sendFile(file: any) {
    //this.file.emit(file);
    //Reset the file input value to allow the user to select the same file again
    //this.fileInput.nativeElement.value = '';
  }

}
