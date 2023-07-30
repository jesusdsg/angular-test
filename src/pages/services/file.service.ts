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
  dateList: any[] = [];

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

  getDateList(array: any): void {
    for (let i = 12; i < array.length; i++) {
      this.dateList.push({ date: array[i], total: 0 });
    }
  }

  getStateList(array: string[]): void {
    array.map((row, index) => {
      if (index == 0) {
        this.getDateList(row);
      } else {
        const exists = this.stateList.find(
          (x: StateModel) => x.name.toLowerCase() == row[6].toLowerCase()
        );
        if (!exists) {
          this.stateList.push({ name: row[6], total: 0, dates: this.dateList });
        }
      }
    });
  }

  getMaxMountByArray(array: string[]): void {
    //First get the Dates :)
    this.getDateList(array[0]);
    //Format per Date
    let dateStartIndex = 14;
    for (let d = 0; d < 250; d++) {
      let stateByDate: any[] = [];
      array.map((row, index) => {
        //Omit headers row
        if (index != 0) {
          //Set State by Date
          let exists = stateByDate.find(
            (x) => x.name.toLowerCase() == row[6].toLowerCase()
          );
          if (!exists) {
            stateByDate.push({
              date: this.dateList[d].date,
              name: row[6],
              value: parseInt(row[dateStartIndex]),
            });
          } else {
            exists.value += parseInt(row[dateStartIndex]);
          }
        }
      });
      //
      console.log('""""""', stateByDate);
      dateStartIndex++;
    }

    //console.log('Date list ', this.dateList);
    //console.log('State list', this.stateList);
    //this.getHighestAndLowest(this.stateList);
  }

  /**
   * Create the State list
   * @param stateName
   * @param amount
   */
  setStateInArray(stateName: string, date: string, amount: number): void {
    const result = this.stateList.find(
      (x: StateModel) => x.name.toLowerCase() == stateName.toLowerCase()
    );
    // already exists the state
    if (result) {
      //result.total += amount;
      const existingDate = result.dates.find((x) => x.date == date);
      if (existingDate) {
        existingDate.total += amount;
      } else {
        result.dates.push({ date, total: amount });
      }
    } /*  else {
      this.stateList.push({ name: stateName, total: amount, dates: [] });
    } */
  }

  getHighestAndLowest(array: StateModel[]): StateModel {
    let max = 0;
    let highest: StateModel = { name: '', total: 0, dates: [] };
    let stateName: string = '';
    array.map((item: StateModel) => {
      if (item.total > max) (highest = item), (max = item.total);
    });
    return highest;
  }
}
