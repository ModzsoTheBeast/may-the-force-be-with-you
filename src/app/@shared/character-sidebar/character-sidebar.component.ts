import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CharacterForm, ExtendedCharacter, Side } from '@app/@types';
import { ElapsedTimePipe } from '@shared/pipes/elapsed-time.pipe';
import { Observable, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { CharacterImageComponent } from '../character-image/character-image.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { CharacterService } from '../services/character.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-character-sidebar',
  imports: [
    CharacterImageComponent,
    ReactiveFormsModule,
    DynamicButtonComponent,
    FormsModule,
    ElapsedTimePipe,
    AsyncPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './character-sidebar.component.html',
  styleUrl: './character-sidebar.component.scss',
})
export class CharacterSidebarComponent implements OnDestroy, AfterViewInit {
  character = input<ExtendedCharacter | null>(null);
  characterService = inject(CharacterService);
  timeService = inject(TimeService);
  characters = this.characterService.characters;
  elapsedSeconds$: Observable<number> | null = null;
  characterForm: FormGroup<CharacterForm> = new FormGroup<CharacterForm>({
    avatar: new FormControl<string>('', { nonNullable: true }),
    power: new FormControl<string>('Erő használata', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    side: new FormControl<Side>(Side.DARK, { nonNullable: true }),
    midiclorian: new FormControl<number>(0, { nonNullable: true }),
  });
  protected readonly Side = Side;
  private timeSubscription: Subscription | null = null;
  private sidebarElement: HTMLElement | null = null;
  private readonly hideEventHandler: (() => void) | null = null;

  constructor() {
    effect(() => {
      const char = this.character();
      if (char) {
        this.unsubscribeFromTimeService();
        this.elapsedSeconds$ = this.timeService.getElapsedTime(
          char.createdTimestamp
        );
        this.timeSubscription = this.elapsedSeconds$.subscribe();
        this.characterForm.controls.avatar.setValue(char.id);
        this.characterForm.controls.side.setValue(char.side);
        this.characterForm.controls.midiclorian.setValue(
          char.abilities.midichlorian
        );
        this.characterForm.controls.name.setValue(char.name);
        this.characterForm.controls.description.setValue(char.description);
      } else {
        this.characterForm.reset();
      }
    });

    this.hideEventHandler = this.handleSidebarHide.bind(this);
  }

  ngAfterViewInit(): void {
    // Find the sidebar element (offcanvas)
    this.sidebarElement = document.querySelector('.offcanvas') as HTMLElement;

    if (this.sidebarElement && this.hideEventHandler) {
      // Listen for the 'hide.bs.offcanvas' event
      this.sidebarElement.addEventListener(
        'hide.bs.offcanvas',
        this.hideEventHandler
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFromTimeService();

    // Clean up event listener
    if (this.sidebarElement && this.hideEventHandler) {
      this.sidebarElement.removeEventListener(
        'hide.bs.offcanvas',
        this.hideEventHandler
      );
    }
  }

  submit() {
    if (this.characterForm.invalid) {
      return;
    }

    const formValues = this.characterForm.getRawValue();

    if (this.character()) {
      // Update existing character
      const updatedCharacter = this.character();
      if (!updatedCharacter || !this.characterService.characters) {
        return;
      }

      const updatedCharacters = this.characterService.characters.map(char => {
        if (char.uuid === updatedCharacter.uuid) {
          return {
            ...char,
            id: formValues.avatar,
            name: formValues.name,
            side: formValues.side,
            description: formValues.description,
            abilities: {
              power: formValues.power,
              midichlorian: formValues.midiclorian,
            },
          };
        }
        return char;
      });

      this.characterService.updateCharacters(updatedCharacters);
    } else {
      // Create new character
      if (!this.characterService.characters) {
        return;
      }

      const newCharacter: ExtendedCharacter = {
        id: formValues.avatar,
        name: formValues.name,
        side: formValues.side,
        description: formValues.description,
        abilities: {
          power: formValues.power,
          midichlorian: formValues.midiclorian,
        },
        createdTimestamp: Date.now(),
        selected: false,
        visible: false,
        health: 100,
        uuid: uuidv4(),
      };

      const updatedCharacters = [
        ...this.characterService.characters,
        newCharacter,
      ];
      this.characterService.updateCharacters(updatedCharacters);
    }

    // Close the sidebar after submission
    this.cancel();
  }

  cancel(): void {
    const closeButton = document.querySelector(
      '[data-bs-dismiss="offcanvas"]'
    ) as HTMLElement;
    if (closeButton) {
      closeButton.click();
    }
  }

  private handleSidebarHide(): void {
    this.unsubscribeFromTimeService();
  }

  private unsubscribeFromTimeService(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
      this.timeSubscription = null;
    }
    this.elapsedSeconds$ = null;
  }
}
