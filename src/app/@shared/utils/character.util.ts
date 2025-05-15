import { Character, ExtendedCharacter } from '@app/@types';

export function getCharacterImageUrl(characterId: string): string {
  const nameMap: { [key: string]: string } = {
    lukeskywalker: 'luke',
    darthvader: 'vader',
    yoda: 'yoda',
    bobafett: 'boba',
    rey: 'rey',
    generalgrievous: 'grievous',
    hansolo: 'solo',
    obiwankenobi: 'kenobi',
    darthmaul: 'maul',
    stormtrooper: 'stormtrooper',
    captainphasma: 'phasma',
    anakinskywalker: 'anakin',
  };

  return nameMap[characterId] || 'luke';
}
// TODO: not needed delete later

export function mapCharacters(character: Character[]): ExtendedCharacter[] {
  return character.map((char: Character, index: number): ExtendedCharacter => {
    return {
      ...char,
      selected: false,
      visible: index === 0 ? true : false,
      health: 100,
    };
  });
}
