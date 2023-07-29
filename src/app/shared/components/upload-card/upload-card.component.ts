import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from '@pages/services/file.service';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss'],
})
export class UploadCardComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() fileInfo!: string;
  fileData: any[] = [];
  constructor(private fileService: FileService) {
    this.fileInfo = 'Drag & drop files here';
  }

  ngOnInit(): void {}

  onDragOver(event: any) {
    event.preventDefault();
  }
  // From drag and drop
  onDropSuccess(event: any) {
    event.preventDefault();
    this.sendFile(event.dataTransfer.files[0]);
  }
  // From attachment link
  onChange(event: any) {
    this.sendFile(event.target.files[0]);
  }

  sendFile(file: any) {
    //Validate the exten
    let extn = file.name.split('.').pop();
    if (extn !== 'csv') {
      alert('File type is not supported');
    }
    /**
     * Read the file and split per row data
     */
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv: string = reader.result as string;
      let data = csv.split('\n');
      data.forEach((item, index) => {
        index != 0 ? this.fileData.push(item) : null;
      });
      console.log('File Data', this.fileData);
    };
  }
}
