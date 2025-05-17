import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  imports: [NgClass, NgStyle],
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicButtonComponent {
  text: InputSignal<string> = input.required<string>();
  type: InputSignal<string> = input<string>('button');
  customStyle: InputSignal<Record<string, string | number> | null | undefined> =
    input<Record<string, string | number> | null | undefined>(null);
  disabled: InputSignal<boolean> = input<boolean>(false);
  variant: InputSignal<'flat' | 'outline' | 'simple'> = input<
    'flat' | 'outline' | 'simple'
  >('flat');
  iconPrefix: InputSignal<string | null> = input<string | null>(null);
  iconPostfix: InputSignal<string | null> = input<string | null>(null);
  textColor: InputSignal<string | null> = input<string | null>(null);
  backgroundColor: InputSignal<string | null> = input<string | null>(null);
  width: InputSignal<'fit-content' | '100%'> = input<'fit-content' | '100%'>(
    'fit-content'
  );
  onClick: OutputEmitterRef<void> = output<void>();
}
