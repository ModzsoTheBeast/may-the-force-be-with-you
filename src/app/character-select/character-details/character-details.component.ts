import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { CharacterModuleComponent } from '@app/character-select/character-details/character-module/character-module.component';
import { CharacterSpecialComponent } from '@app/character-select/character-details/character-special/character-special.component';
import { ExtendedCharacter, Side } from '@app/@types';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { Router } from '@angular/router';
import { SimulateService } from '@shared/services/simulate.service';
import { CharacterService } from '@shared/services/character.service';
import { SimulateRequest } from '@app/@types';
import { showToast } from '@shared/utils';

@Component({
  selector: 'app-character-details',
  imports: [
    CharacterModuleComponent,
    CharacterSpecialComponent,
    DynamicButtonComponent,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent {
  visibleCharacter = input.required<ExtendedCharacter>();
  protected readonly Side = Side;
  router: Router = inject(Router);
  simulateService: SimulateService = inject(SimulateService);
  characterService: CharacterService = inject(CharacterService);

  selectCharacter() {
    const characters = this.characterService.characters;
    if (!characters) return;

    const selectedCharacter = this.visibleCharacter();

    const updatedChars = characters.map((char) => ({
      ...char,
      selected:
        // Keep this character selected if it's the one being clicked
        char.id === selectedCharacter.id
          ? true
          : // Deselect characters on the same side as the selected character
          char.side === selectedCharacter.side
          ? false
          : // Keep the selection state for characters on the other side
            char.selected,
    }));

    this.characterService.updateCharacters(updatedChars);
  }

  startSimulation() {
    const characters = this.characterService.characters;
    if (!characters) return;

    const lightCharacter = characters.find(
      (char) => char.selected && char.side === Side.LIGHT
    );
    const darkCharacter = characters.find(
      (char) => char.selected && char.side === Side.DARK
    );

    if (!lightCharacter || !darkCharacter) {
      showToast({
        message: 'Válassz egy világos és egy sötét karakterta szimulációhoz!',
        type: 'error',
        duration: 2000,
      });
      return;
    }

    // Create simulation request
    const request: SimulateRequest = {
      light: lightCharacter.id,
      dark: darkCharacter.id,
    };

    this.simulateService.startSimulation(request).subscribe((response) => {
      this.router.navigate(['simulation', response.simulationId]);
    });
  }

  editCharacters() {
    this.router.navigate(['character-edit']);
  }
}
