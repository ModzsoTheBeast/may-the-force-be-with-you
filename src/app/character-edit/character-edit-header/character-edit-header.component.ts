import {
  ChangeDetectionStrategy,
  Component,
  output,
  OutputEmitterRef,
} from '@angular/core';

import { DynamicButtonComponent } from '../../@shared/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-character-edit-header',
  imports: [DynamicButtonComponent],
  templateUrl: './character-edit-header.component.html',
  styleUrl: './character-edit-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEditHeaderComponent {
  backClicked: OutputEmitterRef<void> = output<void>();
  addCharacterClicked: OutputEmitterRef<void> = output<void>();
}
