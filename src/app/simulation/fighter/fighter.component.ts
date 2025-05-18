import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
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
  winner: InputSignal<ExtendedCharacter | null | undefined> = input<
    ExtendedCharacter | null | undefined
  >(null);
  defaultLookDirection: InputSignal<Direction> = input<Direction>(
    Direction.CENTER
  );
  imageWidth: InputSignal<string> = input<string>('100%');
  backgroundColor: InputSignal<string> = input<string>('grey');

  onBack: OutputEmitterRef<void> = output<void>();

  isWinner: Signal<boolean> = computed(
    () => !!this.winner() && this.winner()?.id === this.character().id
  );

  showSideName: Signal<boolean> = computed((): boolean => !this.winner());

  lookDirection: Signal<Direction> = computed(
    (): Direction =>
      this.winner() ? Direction.CENTER : this.defaultLookDirection()
  );

  showBackButton: Signal<boolean> = computed(
    () => !!this.winner() && this.winner()?.id === this.character().id
  );

  protected readonly Side: typeof Side = Side;

  back(): void {
    this.onBack.emit();
  }
}
