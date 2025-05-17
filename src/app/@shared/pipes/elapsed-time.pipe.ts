import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime',
  standalone: true,
  pure: true,
})
export class ElapsedTimePipe implements PipeTransform {
  transform(seconds: number): string {
    if (!seconds || seconds <= 0) return '';

    const timeUnits: { value: number; text: string }[] = [
      { value: Math.floor(seconds / (60 * 60 * 24 * 365)), text: 'év' },
      { value: Math.floor(seconds / (60 * 60 * 24)) % 365, text: 'nap' },
      { value: Math.floor(seconds / (60 * 60)) % 24, text: 'óra' },
      { value: Math.floor(seconds / 60) % 60, text: 'perc' },
      { value: seconds % 60, text: 'másodperc' },
    ];

    const parts: string[] = [];

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
  }
}
