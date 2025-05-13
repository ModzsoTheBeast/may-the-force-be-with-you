import { Injectable } from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulateService {

  API_URL: string = `${environment.apiUrl}simulate/`


}
