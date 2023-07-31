import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { FileService } from '@pages/services/file.service';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss'],
})
export class UploadCardComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() fileInfo!: string;
  fileData: any[] = [];

  constructor(
    public fileService: FileService,
    private spinner: SpinnerService
  ) {
    this.fileInfo = 'Drag & drop files here';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  // From drag and drop
  onDropSuccess(event: DragEvent) {
    event.preventDefault();
    this.sendFile(event.dataTransfer!.files[0]);
  }
  // From attachment link
  onChange(event: { target: HTMLInputElement | any }) {
    this.sendFile(event.target.files[0]);
  }

  sendFile(file: File) {
    this.spinner.show();
    //Validate the exten
    let extn = file.name.split('.').pop();
    if (extn !== 'csv') {
      alert('File type is not supported');
      this.spinner.hide();
    } else {
      /**
       * Read the file and split per row data
       */
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let data = csv.split('\n');
        data.forEach((item, index) => {
          this.fileData.push(item.split(','));
        });
        this.fileService.getFileData(this.fileData);
        this.spinner.hide();
        window.location.reload();
      };
    }
  }
}
