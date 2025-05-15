import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Direction } from '@app/@types';

@Component({
  selector: 'app-character-image',
  imports: [],
  templateUrl: './character-image.component.html',
  styleUrl: './character-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterImageComponent {
  characterId = input.required<string>()
  lookDirection = input<Direction>(Direction.LEFT)
  backgroundColor = input<string>("yellow")
}
