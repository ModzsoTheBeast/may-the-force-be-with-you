import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private readonly timeUpdateInterval = 1000; // Update every second
  private currentTime$ = new BehaviorSubject<number>(
    Math.floor(Date.now() / 1000)
  );

  constructor() {
    // Update the current time every second
    interval(this.timeUpdateInterval).subscribe(() => {
      this.currentTime$.next(Math.floor(Date.now() / 1000));
    });
  }

  /**
   * Get an observable that emits the elapsed time in seconds since the given timestamp
   * @param timestamp Unix timestamp in seconds
   */
  getElapsedTime(timestamp: number): Observable<number> {
    // Normalize timestamp to seconds if needed
    const timestampInSeconds =
      timestamp > 10000000000 ? Math.floor(timestamp / 1000) : timestamp;

    return this.currentTime$.pipe(
      map(currentTime => Math.max(0, currentTime - timestampInSeconds)),
      shareReplay(1)
    );
  }
}
