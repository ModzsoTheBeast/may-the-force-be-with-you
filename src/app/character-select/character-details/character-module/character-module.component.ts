import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';

@Component({
  selector: 'app-character-module',
  imports: [],
  templateUrl: './character-module.component.html',
  styleUrl: './character-module.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterModuleComponent {
  title: InputSignal<string> = input.required<string>();
  subtitle: InputSignal<string> = input.required<string>();
}
