import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { DateModel, StateModel } from '@models/file/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private currentFileSubject!: BehaviorSubject<any>;
  public currentFile!: Observable<any>;

  stateList: StateModel[] = [];
  dateList: DateModel[] = [];
  reports: any[] = [];

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
    this.storage.removeData('currentFile');
    this.storage.saveDataObject('currentFile', object);
  }

  getDateList(array: any): void {
    //12 is the index in row where dates start
    for (let i = 12; i < array.length; i++) {
      this.dateList.push({ date: array[i] });
    }
  }

  getFileData(array: string[]): void {
    //First get the Dates :)
    this.getDateList(array[0]);
    let dateStartIndex = 14;
    //Calculate by date
    for (let d = 0; d < this.dateList.length; d++) {
      let stateByDate: any[] = [];
      array.forEach((row, index) => {
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
      //Get the highest and lowest
      const highest = this.getHighest(stateByDate);
      const lowest = this.getLowest(stateByDate);
      this.reports.push({
        date: Date.parse(this.dateList[d].date),
        highest: highest.name,
        lowest: lowest.name,
      });
      dateStartIndex++;
    }
    //Set the reports in localsotrage
    this.setFile(this.reports);
    console.log('Reports', this.reports);
  }

  /**
   * Get the Highest by Date
   * @param array
   * @returns
   */
  getHighest(array: StateModel[]): StateModel {
    let max = 0;
    let highest: StateModel = { name: '', value: 0, date: '' };
    array.forEach((item: StateModel) => {
      if (item.value > max) (highest = item), (max = item.value);
    });
    return highest;
  }

  /**
   * Lowest By Date
   * @param array
   * @returns
   */
  getLowest(array: StateModel[]): StateModel {
    let min = 0;
    let lowest: StateModel = { name: '', value: 0, date: '' };
    array.forEach((item: StateModel) => {
      if (item.value <= min) (lowest = item), (min = item.value);
    });
    return lowest;
  }
}
