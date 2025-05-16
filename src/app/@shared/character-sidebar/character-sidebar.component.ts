import { Component, inject, input } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CharacterForm, ExtendedCharacter, Side } from '@app/@types';
import { CharacterService } from '../services/character.service';
import { CharacterImageComponent } from '../character-image/character-image.component';
import { CounterComponent } from '../counter/counter.component';
import { JsonPipe } from '@angular/common';
import { DynamicButtonComponent } from "../dynamic-button/dynamic-button.component";

@Component({
  selector: 'app-character-sidebar',
  imports: [
    CharacterImageComponent,
    CounterComponent,
    ReactiveFormsModule,
    JsonPipe,
    DynamicButtonComponent,
    FormsModule
  ],
  templateUrl: './character-sidebar.component.html',
  styleUrl: './character-sidebar.component.scss',
})
export class CharacterSidebarComponent {
  submit() {
    throw new Error('Method not implemented.');
  }
  character = input<ExtendedCharacter | null>(null);
  characterService = inject(CharacterService);
  characters = this.characterService.characters;
  characterForm: FormGroup<CharacterForm> = new FormGroup<CharacterForm>({
    avatar: new FormControl<string>('', { nonNullable: true }),
    power: new FormControl<string>('Erő használata', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    side: new FormControl<Side>(Side.DARK, { nonNullable: true }),
    midiclorian: new FormControl<number>(0, { nonNullable: true }),
  });
  protected readonly Side = Side;
}
