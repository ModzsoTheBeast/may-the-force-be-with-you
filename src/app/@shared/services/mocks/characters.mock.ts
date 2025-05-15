import { Character } from '@app/@types';

// Individual character mocks based on image assets
const characters: Character[] = [
  {
    id: '1',
    name: 'Luke Skywalker',
    side: 'LIGHT',
    abilities: {
      power: 'Force Push',
      midichlorian: 14500,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Master who defeated the Empire',
  },
  {
    id: '2',
    name: 'Darth Vader',
    side: 'DARK',
    abilities: {
      power: 'Force Choke',
      midichlorian: 27700,
    },
    createdTimestamp: Date.now(),
    description: 'Sith Lord and former Jedi Knight',
  },
  {
    id: '3',
    name: 'Yoda',
    side: 'LIGHT',
    abilities: {
      power: 'Force Wisdom',
      midichlorian: 17700,
    },
    createdTimestamp: Date.now(),
    description: 'Legendary Jedi Master and trainer',
  },
  {
    id: '4',
    name: 'Emperor Palpatine',
    side: 'DARK',
    abilities: {
      power: 'Force Lightning',
      midichlorian: 20500,
    },
    createdTimestamp: Date.now(),
    description: 'Dark Lord of the Sith and Emperor of the Galactic Empire',
  },
  {
    id: '5',
    name: 'Boba Fett',
    side: 'DARK',
    abilities: {
      power: 'Mandalorian Tactics',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Legendary bounty hunter known for his ruthless efficiency',
  },
  {
    id: '6',
    name: 'General Grievous',
    side: 'DARK',
    abilities: {
      power: 'Lightsaber Combat',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Cyborg Supreme Commander of the Droid Army',
  },
  {
    id: '7',
    name: 'Han Solo',
    side: 'LIGHT',
    abilities: {
      power: 'Blaster Accuracy',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Corellian smuggler and captain of the Millennium Falcon',
  },
  {
    id: '8',
    name: 'Rey',
    side: 'LIGHT',
    abilities: {
      power: 'Force Healing',
      midichlorian: 15000,
    },
    createdTimestamp: Date.now(),
    description:
      'Force-sensitive scavenger from Jakku who joined the Resistance',
  },
  {
    id: '9',
    name: 'Obi-Wan Kenobi',
    side: 'LIGHT',
    abilities: {
      power: 'Defensive Lightsaber',
      midichlorian: 13400,
    },
    createdTimestamp: Date.now(),
    description: 'Jedi Master who trained Anakin and Luke Skywalker',
  },
  {
    id: '10',
    name: 'Darth Maul',
    side: 'DARK',
    abilities: {
      power: 'Double-bladed Lightsaber',
      midichlorian: 12000,
    },
    createdTimestamp: Date.now(),
    description: 'Sith Lord trained by Darth Sidious',
  },
  {
    id: '11',
    name: 'Stormtrooper',
    side: 'DARK',
    abilities: {
      power: 'Imperial Training',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: 'Elite shock troops of the Galactic Empire',
  },
  {
    id: '12',
    name: 'Captain Phasma',
    side: 'DARK',
    abilities: {
      power: 'Combat Expertise',
      midichlorian: 0,
    },
    createdTimestamp: Date.now(),
    description: "Commander of the First Order's stormtrooper legions",
  },
  {
    id: '13',
    name: 'Anakin Skywalker',
    side: 'LIGHT',
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
export const CHARACTERS_RESPONSE_MOCK = {
  characters: characters,
};
