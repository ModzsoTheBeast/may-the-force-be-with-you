import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Character, CharactersResponse } from '@app/@types';
import { Observable, map, of } from 'rxjs';
import {
  CHARACTERS_RESPONSE_MOCK,
} from './mocks/characters.mock';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly API_URL: string = `${environment.apiUrl}characters/`;
  private readonly mockDataService = inject(MockDataService);

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    if (this.mockDataService.useMockData) {
      console.log('Using mock character data');
      return of(CHARACTERS_RESPONSE_MOCK.characters);
    }

    return this.http
      .get<CharactersResponse>(this.API_URL)
      .pipe(map((response) => response.characters));
  }

}
