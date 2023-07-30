import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { StateModel } from '@models/file/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private currentFileSubject!: BehaviorSubject<any>;
  public currentFile!: Observable<any>;

  stateList: StateModel[] = [];

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

  getMaxMountByArray(array: string[]): void {
    array.map((item: any) => {
      /* Get the sum by Item */
      let start = 13,
        end = item.length - 1,
        sum = 0;
      for (let i = start; i <= end; i++) sum += parseInt(item[i]);
      this.setStateInArray(item[6], sum);
    });

    console.log('State list', this.stateList);
    this.getHighestAndLowest(this.stateList);
  }

  /**
   * Create the State list
   * @param stateName
   * @param amount
   */
  setStateInArray(stateName: string, amount: number): void {
    let result = this.stateList.find(
      (x: { name: string; total: number }) =>
        x.name.toLowerCase() == stateName.toLowerCase()
    );
    if (result) {
      result.total += amount;
    } else {
      this.stateList.push({ name: stateName, total: amount });
    }
  }

  getHighestAndLowest(array: StateModel[]): StateModel {
    let max = 0;
    let highest: StateModel = { name: '', total: 0 };
    let stateName: string = '';
    array.map((item: StateModel) => {
      if (item.total > max) (highest = item), (max = item.total);
    });
    return highest;
  }
}
