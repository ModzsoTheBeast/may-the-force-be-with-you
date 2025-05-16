import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  protected readonly Direction = Direction;
  protected readonly Side = Side;
}
