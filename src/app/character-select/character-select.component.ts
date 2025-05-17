import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExtendedCharacter } from '@app/@types';
import { CharacterDetailsComponent } from '@app/character-select/character-details/character-details.component';
import { CharacterSwiperComponent } from '@app/character-select/character-swiper/character-swiper.component';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { CharacterService } from '@shared/services/character.service';

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
  characters: Signal<ExtendedCharacter[] | undefined>;
  visibleCharacter = computed(() => {
    return this.characters()?.find(char => char.visible) as ExtendedCharacter;
  });

  private characterService: CharacterService;

  constructor() {
    this.characterService = inject(CharacterService);
    this.characters = this.characterService.loadCharacters();
  }

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
