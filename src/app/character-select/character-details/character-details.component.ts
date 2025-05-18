import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ExtendedCharacter, Side } from '@app/@types';
import { SimulateRequest } from '@app/@types';
import { CharacterModuleComponent } from '@app/character-select/character-details/character-module/character-module.component';
import { CharacterSpecialComponent } from '@app/character-select/character-details/character-special/character-special.component';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { CharacterService } from '@shared/services/character.service';
import { SimulateService } from '@shared/services/simulate.service';
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
  visibleCharacter: InputSignal<ExtendedCharacter> =
    input.required<ExtendedCharacter>();
  router: Router = inject(Router);
  simulateService: SimulateService = inject(SimulateService);
  characterService: CharacterService = inject(CharacterService);
  protected readonly Side: typeof Side = Side;

  selectCharacter(): void {
    const characters: ExtendedCharacter[] | undefined =
      this.characterService.characters;
    if (!characters) return;

    const selectedCharacter: ExtendedCharacter = this.visibleCharacter();

    const updatedChars: ExtendedCharacter[] = characters.map(
      (char: ExtendedCharacter): ExtendedCharacter => {
        let selected: boolean = char.selected;

        if (char.id === selectedCharacter.id) {
          selected = true;
        } else if (char.side === selectedCharacter.side) {
          selected = false;
        }

        return {
          ...char,
          selected,
        };
      }
    );

    this.characterService.updateCharacters(updatedChars);
  }

  startSimulation(): void {
    const characters: ExtendedCharacter[] | undefined =
      this.characterService.characters;
    if (!characters) return;

    const lightCharacter: ExtendedCharacter | undefined = characters.find(
      (char: ExtendedCharacter): boolean =>
        char.selected && char.side === Side.LIGHT
    );
    const darkCharacter: ExtendedCharacter | undefined = characters.find(
      (char: ExtendedCharacter): boolean =>
        char.selected && char.side === Side.DARK
    );

    if (!lightCharacter || !darkCharacter) {
      showToast({
        message: 'Válassz egy világos és egy sötét karakterta szimulációhoz!',
        type: 'error',
        duration: 2000,
      });
      return;
    }

    const request: SimulateRequest = {
      light: lightCharacter.id,
      dark: darkCharacter.id,
    };

    this.simulateService.startSimulation(request).subscribe(response => {
      this.router.navigate(['simulation', response.simulationId]);
    });
  }

  editCharacters(): void {
    this.router.navigate(['character-edit']);
  }
}
