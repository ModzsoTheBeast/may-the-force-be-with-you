import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Direction, ExtendedCharacter, Side } from '@app/@types';
import { CharacterImageComponent } from '@shared/character-image/character-image.component';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';

@Component({
  selector: 'app-fighter',
  standalone: true,
  imports: [CharacterImageComponent, DynamicButtonComponent],
  templateUrl: './fighter.component.html',
  styleUrl: './fighter.component.scss',
})
export class FighterComponent {
  character: InputSignal<ExtendedCharacter> =
    input.required<ExtendedCharacter>();
  isAttacking: InputSignal<boolean> = input<boolean>(false);
  isWinner: InputSignal<boolean> = input<boolean>(false);
  showSideName: InputSignal<boolean> = input<boolean>(true);
  lookDirection: InputSignal<Direction> = input<Direction>(Direction.CENTER);
  imageWidth: InputSignal<string> = input<string>('100%');
  backgroundColor: InputSignal<string> = input<string>('grey');
  showBackButton: InputSignal<boolean> = input<boolean>(false);

  onBack: OutputEmitterRef<void> = output<void>();

  protected readonly Side: typeof Side = Side;

  back(): void {
    this.onBack.emit();
  }
}
