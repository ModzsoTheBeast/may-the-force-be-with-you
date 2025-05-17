import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
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
  characterId = input.required<string>();
  lookDirection = input<Direction>(Direction.LEFT);
  backgroundColor = input<string>('yellow');
  hasBackground = input<boolean>(true);
  selectable = input<boolean>(false);
  customImageStyle = input<Record<string, string | number> | null | undefined>(
    null
  );
  onClickEvent = output<void>();

  protected readonly Direction = Direction;
  protected readonly Side = Side;

  onClick() {
    this.onClickEvent.emit();
  }
}
