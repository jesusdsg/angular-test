import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private currentFileSubject!: BehaviorSubject<any>;
  public currentFile!: Observable<any>;

  constructor(private storage: StorageService) {
    this.currentFileSubject = new BehaviorSubject<any>(
      JSON.parse(this.storage.getData('currentFile') || '{}')
    );
    this.currentFile = this.currentFileSubject.asObservable();
  }

  /**
   * Get the localstorage file value
   */
  public get currentFileValue(): any {
    return this.currentFileSubject.value;
  }

  /**
   * Save File in localstorage
   * @param object
   */
  setFile(object: any) {
    this.storage.saveDataObject('currentFile', object);
  }
}
