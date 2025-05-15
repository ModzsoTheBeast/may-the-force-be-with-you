import { Character, CharactersResponse, Side } from '@app/@types';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

// Individual character mocks based on image assets
const characters: Character[] = [
  {
    id: 'luke',
    name: 'Luke Skywalker',
    side: Side.LIGHT,
    abilities: {
      power: 'Force Push',
      midichlorian: 14500,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Master who defeated the Empire',
  },
  {
    id: 'vader',
    name: 'Darth Vader',
    side: Side.DARK,
    abilities: {
      power: 'Force Choke',
      midichlorian: 27700,
    },
    createdTimestamp: Date.now(),
    description: 'Sith Lord and former Jedi Knight',
  },
  {
    id: 'yoda',
    name: 'Yoda',
    side: Side.LIGHT,
    abilities: {
      power: 'Force Wisdom',
      midichlorian: 17700,
    },
    createdTimestamp: Date.now(),
    description: 'Legendary Jedi Master and trainer',
  },
  {
    id: 'boba',
    name: 'Boba Fett',
    side: Side.DARK,
    abilities: {
      power: 'Mandalorian Tactics',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Legendary bounty hunter known for his ruthless efficiency',
  },
  {
    id: 'grievous',
    name: 'General Grievous',
    side: Side.DARK,
    abilities: {
      power: 'Lightsaber Combat',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Cyborg Supreme Commander of the Droid Army',
  },
  {
    id: 'solo',
    name: 'Han Solo',
    side: Side.LIGHT,
    abilities: {
      power: 'Blaster Accuracy',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Corellian smuggler and captain of the Millennium Falcon',
  },
  {
    id: 'rey',
    name: 'Rey',
    side: Side.LIGHT,
    abilities: {
      power: 'Force Healing',
      midichlorian: 15000,
    },
    createdTimestamp: Date.now(),
    description:
      'Force-sensitive scavenger from Jakku who joined the Resistance',
  },
  {
    id: 'kenobi',
    name: 'Obi-Wan Kenobi',
    side: Side.LIGHT,
    abilities: {
      power: 'Defensive Lightsaber',
      midichlorian: 13400,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Master who trained Anakin and Luke Skywalker',
  },
  {
    id: 'maul',
    name: 'Darth Maul',
    side: Side.DARK,
    abilities: {
      power: 'Double-bladed Lightsaber',
      midichlorian: 12000,
    },
    createdTimestamp: Date.now(),
    description: 'Sith Lord trained by Darth Sidious',
  },
  {
    id: 'stormtrooper',
    name: 'Stormtrooper',
    side: Side.DARK,
    abilities: {
      power: 'Imperial Training',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Elite shock troops of the Galactic Empire',
  },
  {
    id: 'phasma',
    name: 'Captain Phasma',
    side: Side.DARK,
    abilities: {
      power: 'Combat Expertise',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: "Commander of the First Order's stormtrooper legions",
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    side: Side.LIGHT,
    abilities: {
      power: 'Lightsaber Combat',
      midichlorian: 27000,
    },
    createdTimestamp: Date.now(),
    description:
      'Jedi Knight before his fall to the dark side and transformation into Darth Vader',
  },
];

// Export with proper type for API mock
export const CHARACTERS_RESPONSE_MOCK$: Observable<CharactersResponse> = of({
  characters: characters,
});
