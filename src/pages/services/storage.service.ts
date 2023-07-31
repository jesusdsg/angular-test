import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/* Local storage service */
export class StorageService {
  constructor() {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public saveDataObject(key: string, object: Object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
