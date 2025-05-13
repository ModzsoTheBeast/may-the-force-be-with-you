import {CharacterAbilities, Side} from '@app/@types';

export type Character = {
  id: string;
  name: string;
  side: Side;
  abilities: CharacterAbilities;
  createdTimestamp: number;
  description: string;
}
