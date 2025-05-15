import { Injectable, inject, Signal, signal, computed } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { CharactersResponse, ExtendedCharacter } from '@app/@types';
import { map } from 'rxjs';
import { CHARACTERS_RESPONSE_MOCK$ } from './mocks/characters.mock';
import { MockDataService } from './mock-data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { mapCharacters } from '@app/@shared';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly API_URL: string = `${environment.apiUrl}characters/`;
  private readonly mockDataService: MockDataService = inject(MockDataService);
  private readonly http: HttpClient = inject(HttpClient);
  private charactersSignal = signal<ExtendedCharacter[] | undefined>(undefined);

  selectedCharacters = computed(()=> {
    return this.charactersSignal()?.filter(character => character.selected)
  })

  loadCharacters(): Signal<ExtendedCharacter[] | undefined> {
    if (this.mockDataService.useMockData) {
      CHARACTERS_RESPONSE_MOCK$.pipe(
        map((response: CharactersResponse): ExtendedCharacter[] =>
          mapCharacters(response.characters)
        )
      ).subscribe((characters) => {
        this.charactersSignal.set(characters);
      });

      return this.charactersSignal.asReadonly();
    } else {
      this.http
        .get<CharactersResponse>(this.API_URL)
        .pipe(
          map((response: CharactersResponse): ExtendedCharacter[] =>
            mapCharacters(response.characters)
          )
        )
        .subscribe((characters) => {
          this.charactersSignal.set(characters);
        });

      return this.charactersSignal.asReadonly();
    }
  }

  updateCharacters(characters: ExtendedCharacter[]): void {
    this.charactersSignal.set(characters);
  }

  get characters() {
    return this.charactersSignal()
  }
}
