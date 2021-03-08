import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  serverURL: 'http://localhost:3000',
  serverOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
};
