import { Character, ExtendedCharacter } from '@app/@types';
import { v4 as uuidv4 } from 'uuid';

export function mapCharacters(character: Character[]): ExtendedCharacter[] {
  return character.map((char: Character, index: number): ExtendedCharacter => {
    return {
      ...char,
      selected: false,
      visible: index === 0,
      health: 100,
      uuid: uuidv4()
    };
  });
}
