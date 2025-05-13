import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  imports: [],
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.scss'
})
export class DynamicButtonComponent {
  text: InputSignal<string> = input.required<string>();
  onClick: OutputEmitterRef<void> = output<void>()
}
