import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { CharacterService } from '@app/@shared/services/character.service';
import { ExtendedCharacter } from '@app/@types';
import { DynamicButtonComponent } from "../@shared/dynamic-button/dynamic-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-edit',
  standalone: true,
  imports: [CommonModule, PageShellComponent, DynamicButtonComponent],
  templateUrl: './character-edit.component.html',
  styleUrl: './character-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEditComponent {
  private characterService: CharacterService = inject(CharacterService);
  private router: Router = inject(Router);
  readonly characters: Signal<ExtendedCharacter[] | undefined> =
    this.characterService.loadCharacters();

  back() {
    this.router.navigate(['charanter-select'])
  }
  addCharacter() {
    throw new Error('Method not implemented.');
  }
}
