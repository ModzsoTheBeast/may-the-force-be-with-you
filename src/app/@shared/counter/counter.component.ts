import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  input,
  InputSignal,
  WritableSignal,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit, OnDestroy {
  timestamp: InputSignal<number> = input.required<number>();
  currentTime: WritableSignal<number> = signal<number>(Date.now() / 1000);
  private intervalId: ReturnType<typeof setInterval> | undefined;

  elapsedTimeText: Signal<string> = computed((): string => {
    const diff: number = Math.floor(this.currentTime() - this.timestamp());

    if (diff <= 0) return '';

    const timeUnits: { value: number; text: string }[] = [
      { value: Math.floor(diff / (60 * 60 * 24 * 365)), text: 'év' },
      { value: Math.floor(diff / (60 * 60 * 24)) % 365, text: 'nap' },
      { value: Math.floor(diff / (60 * 60)) % 24, text: 'óra' },
      { value: Math.floor(diff / 60) % 60, text: 'perc' },
      { value: diff % 60, text: 'másodperc' },
    ];

    // First filter valid units
    const parts: string[] = [];

    // Add time units to parts if they're greater than 0
    for (const unit of timeUnits) {
      if (unit.value > 0 || (unit.text === 'másodperc' && parts.length === 0)) {
        parts.push(`${unit.value} ${unit.text}`);
      }
    }

    if (parts.length === 1) {
      return parts[0];
    } else {
      const lastPart: string | undefined = parts.pop();
      const joinedParts: string = parts.join(', ');
      return lastPart ? `${joinedParts} és ${lastPart}` : joinedParts;
    }
  });

  ngOnInit(): void {
    this.intervalId = setInterval((): void => {
      this.currentTime.set(Date.now() / 1000);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
