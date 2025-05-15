import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SIMULATION_RESULT_MOCK,
} from './mocks/simulate.mock';
import { SimulateRequest, SimulateResponse } from '@app/@types';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class SimulateService {
  private readonly API_URL: string = `${environment.apiUrl}simulate/`;
  private readonly mockDataService = inject(MockDataService);

  constructor(private http: HttpClient) {}

  startSimulation(characters: SimulateRequest): Observable<SimulateResponse> {
    if (this.mockDataService.useMockData) {
      return SIMULATION_RESULT_MOCK;
    }

    return this.http.post<SimulateResponse>(this.API_URL, characters);
  }
}
