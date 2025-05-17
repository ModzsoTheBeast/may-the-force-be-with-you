import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-special',
  imports: [CommonModule],
  templateUrl: './character-special.component.html',
  styleUrl: './character-special.component.scss',
})
export class CharacterSpecialComponent {
  text = input<string>('');
  title = input.required<string>();
  purpose = input.required<'side' | 'power'>();
}
