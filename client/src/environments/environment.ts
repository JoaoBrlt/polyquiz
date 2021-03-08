import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false,
  serverURL: 'http://localhost:3000',
  serverOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
};
