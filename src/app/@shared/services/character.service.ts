import { Injectable } from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  API_URL: string = `${environment.apiUrl}characters/`

  getCharacters() {

  }

  startSimulation() {

  }
}
