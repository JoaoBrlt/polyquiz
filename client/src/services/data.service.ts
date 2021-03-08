// App.
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * The server URL.
   */
  protected serverURL: string;

  /**
   * The server options.
   * These options are used for requests with a JSON body.
   */
  protected serverOptions: object;

  /**
   * Constructs the data service.
   */
  constructor() {
    this.serverURL = environment.serverURL;
    this.serverOptions = environment.serverOptions;
  }
}
