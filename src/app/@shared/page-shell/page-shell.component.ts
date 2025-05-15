import {Component, input, InputSignal} from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [PageHeaderComponent, NgStyle],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss',
})
export class PageShellComponent {
  backgroundUrl: InputSignal<string> = input<string>("/assets/backgrounds/bg_2@2x.png")
}
