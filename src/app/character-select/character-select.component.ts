import {
  Component,
  inject,
  Signal,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { CharacterService } from '@shared/services/character.service';
import { Character, ExtendedCharacter } from '@app/@types';
import { CharacterSwiperComponent } from '@app/character-select/character-swiper/character-swiper.component';
import { CharacterDetailsComponent } from '@app/character-select/character-details/character-details.component';

@Component({
  selector: 'app-character-select',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    PageShellComponent,
    CharacterSwiperComponent,
    CharacterDetailsComponent,
  ],
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSelectComponent {
  private characterService: CharacterService = inject(CharacterService);
  readonly characters: Signal<ExtendedCharacter[] | undefined> =
    this.characterService.loadCharacters();

  visibleCharacter = computed(() => {
    return this.characters()?.find((char) => char.visible) as ExtendedCharacter;
  });

  onSwipe(event: number) {
    const chars = this.characters();
    if (!chars) return;

    const updatedChars = chars.map((char, index) => ({
      ...char,
      visible: index === event,
    }));

    this.characterService.updateCharacters(updatedChars);
  }
}
