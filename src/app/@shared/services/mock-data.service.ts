import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private _useMockData = signal<boolean>(false);

  get useMockData(): boolean {
    return this._useMockData();
  }

  enableMockData(): void {
    console.warn('Switching to mock data mode due to authentication issues');
    this._useMockData.set(true);
  }

  disableMockData(): void {
    this._useMockData.set(false);
  }
}
