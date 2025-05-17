import { Character, CharactersResponse, Side } from '@app/@types';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

// Individual character mocks based on image assets
const characters: Character[] = [
  {
    id: 'luke',
    name: 'Luke Skywalker',
    side: Side.LIGHT,
    abilities: {
      power: 'Erő használata',
      midichlorian: 14500,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Mester, aki legyőzte a Birodalmat',
  },
  {
    id: 'vader',
    name: 'Darth Vader',
    side: Side.DARK,
    abilities: {
      power: 'Erő használata',
      midichlorian: 27700,
    },
    createdTimestamp: Date.now(),
    description: 'Sith Nagyúr és egykori Jedi Lovag',
  },
  {
    id: 'yoda',
    name: 'Yoda',
    side: Side.LIGHT,
    abilities: {
      power: 'Erő használata',
      midichlorian: 17700,
    },
    createdTimestamp: Date.now(),
    description: 'Legendás Jedi Mester és oktató',
  },
  {
    id: 'boba',
    name: 'Boba Fett',
    side: Side.DARK,
    abilities: {
      power: 'Harcászati tapasztalat',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Legendás fejvadász, aki könyörtelen hatékonyságáról ismert',
  },
  {
    id: 'grievous',
    name: 'General Grievous',
    side: Side.DARK,
    abilities: {
      power: 'Kibernetikus test',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Kiborg Főparancsnok a Droid Hadseregben',
  },
  {
    id: 'solo',
    name: 'Han Solo',
    side: Side.LIGHT,
    abilities: {
      power: 'Űrcsempész',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Corelliai csempész és a Millennium Falcon kapitánya',
  },
  {
    id: 'rey',
    name: 'Rey',
    side: Side.LIGHT,
    abilities: {
      power: 'Erő használata',
      midichlorian: 15000,
    },
    createdTimestamp: Date.now(),
    description:
      'Erő-érzékeny guberáló Jakkuról, aki csatlakozott az Ellenálláshoz',
  },
  {
    id: 'kenobi',
    name: 'Obi-Wan Kenobi',
    side: Side.LIGHT,
    abilities: {
      power: 'Harcászati tapasztalat',
      midichlorian: 13400,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Mester, aki Anakin és Luke Skywalkert képezte',
  },
  {
    id: 'maul',
    name: 'Darth Maul',
    side: Side.DARK,
    abilities: {
      power: 'Harcászati tapasztalat',
      midichlorian: 12000,
    },
    createdTimestamp: Date.now(),
    description: 'Darth Sidious által képzett Sith Nagyúr',
  },
  {
    id: 'stormtrooper',
    name: 'Stormtrooper',
    side: Side.DARK,
    abilities: {
      power: 'Fehér páncélzat',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'A Galaktikus Birodalom elit rohamosztagosai',
  },
  {
    id: 'phasma',
    name: 'Captain Phasma',
    side: Side.DARK,
    abilities: {
      power: 'Páncélzat',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Az Első Rend rohamosztagos légióinak parancsnoka',
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    side: Side.LIGHT,
    abilities: {
      power: 'Erő használata',
      midichlorian: 27000,
    },
    createdTimestamp: Date.now(),
    description:
      'Jedi Lovag, mielőtt átállt a sötét oldalra és Darth Vaderré vált',
  },
];

// Export with proper type for API mock
export const CHARACTERS_RESPONSE_MOCK$: Observable<CharactersResponse> = of({
  characters: characters,
});
