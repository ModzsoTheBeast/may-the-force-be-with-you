import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-dynamic-button',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicButtonComponent {
  text: InputSignal<string> = input.required<string>();
  type: InputSignal<string> = input<string>('button');
  customStyle: InputSignal<{ [p: string]: any } | null | undefined> = input<{ [p: string]: any } | null | undefined>(null);
  disabled: InputSignal<boolean> = input<boolean>(false);
  variant: InputSignal<'flat' | 'outline'> = input<'flat' | 'outline'>('flat');
  onClick: OutputEmitterRef<void> = output<void>();
}
