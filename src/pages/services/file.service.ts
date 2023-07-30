import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { AmountModel, DateModel, StateModel } from '@models/file/file.model';

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
    //Calculate the amounts by date
    for (let d = 0; d < this.dateList.length; d++) {
      let stateByDate: any[] = [];
      array.forEach((row, index) => {
        //Omit headers row
        if (index != 0) {
          this.setStateByDate(stateByDate, row, d, dateStartIndex);
        }
      });
      //Create new array
      this.reports.push({
        date: new Date(this.dateList[d].date),
        result: this.getHighestAndLowest(stateByDate),
      });
      dateStartIndex++;
    }
    //Set the reports in localsotrage
    this.setFile(this.reports);
    console.log('Reports', this.reports);
    console.log('List of states', this.stateList);
  }

  /**
   * Get the Highest and lowest by Date
   * @param array
   * @returns
   */
  getHighestAndLowest(array: StateModel[]) {
    let max = 0,
      min = 0;
    let highest: AmountModel = { name: 'None', value: 0 };
    let lowest: AmountModel = { name: 'None', value: 0 };
    array.forEach((item: StateModel) => {
      //Highest
      if (item.value > max)
        (highest.name = item.name),
          (highest.value = item.value),
          (max = item.value);
      //Lowest
      if (item.value <= max)
        (lowest.name = item.name),
          (lowest.value = item.value),
          (min = item.value);
    });

    return { highest, lowest };
  }

  getTotalByRow(row: any[]): void {
    /* Get the sum by Row */
    let start = 13,
      end = row.length - 1,
      sum = 0;
    for (let i = start; i <= end; i++) sum += parseInt(row[i]);
    this.setStateInArray(row[6], sum);
  }

  setStateByDate(
    stateByDate: any,
    row: any,
    dateIndex: number,
    dateStartIndex: number
  ) {
    //Validate the row lenght
    if (row.length > 1) {
      //Set State by Date
      let exists = stateByDate.find(
        (x: { name: string }) => x.name.toLowerCase() == row[6].toLowerCase()
      );
      if (!exists) {
        stateByDate.push({
          date: this.dateList[dateIndex].date,
          name: row[6],
          value: parseInt(row[dateStartIndex]),
        });
      } else {
        exists.value += parseInt(row[dateStartIndex]);
      }
    }
  }

  setStateInArray(stateName: string, amount: number): void {
    let result = this.stateList.find(
      (x: StateModel) => x.name.toLowerCase() == stateName.toLowerCase()
    );
    if (result) {
      result.value += amount;
    } else {
      this.stateList.push({ name: stateName, value: amount, date: '' });
    }
  }
}
