import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  imports: [],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent {}
