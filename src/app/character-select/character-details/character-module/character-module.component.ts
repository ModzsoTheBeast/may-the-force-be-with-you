import {Component, ChangeDetectionStrategy, Input, input} from '@angular/core';

@Component({
  selector: 'app-character-module',
  imports: [],
  templateUrl: './character-module.component.html',
  styleUrl: './character-module.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterModuleComponent {
  title = input.required<string>()
  subtitle = input.required<string>()
}
