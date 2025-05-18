import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Direction, Side } from '@app/@types';

@Component({
  selector: 'app-character-image',
  imports: [CommonModule],
  templateUrl: './character-image.component.html',
  styleUrl: './character-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterImageComponent {
  characterId: InputSignal<string> = input.required<string>();
  lookDirection: InputSignal<Direction> = input<Direction>(Direction.LEFT);
  backgroundColor: InputSignal<string> = input<string>('yellow');
  hasBackground: InputSignal<boolean> = input<boolean>(true);
  selectable: InputSignal<boolean> = input<boolean>(false);
  customImageStyle: InputSignal<
    Record<string, string | number> | null | undefined
  > = input<Record<string, string | number> | null | undefined>(null);
  onClickEvent: OutputEmitterRef<void> = output<void>();

  protected readonly Direction: typeof Direction = Direction;
  protected readonly Side: typeof Side = Side;

  onClick(): void {
    this.onClickEvent.emit();
  }
}
