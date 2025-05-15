import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';

@Component({
  selector: 'app-character-edit',
  standalone: true,
  imports: [CommonModule, PageShellComponent],
  templateUrl: './character-edit.component.html',
  styleUrl: './character-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEditComponent {}
