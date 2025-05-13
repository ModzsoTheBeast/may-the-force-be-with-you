import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Character } from '@app/@types';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-character-select',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharacterSelectComponent implements OnInit {
  characters: Character[] = [
    {
      id: '1',
      name: 'Luke Skywalker',
      side: 'LIGHT',
      abilities: { power: 'Force', midichlorian: 15000 },
      createdTimestamp: Date.now(),
      description: 'Jedi Knight and hero of the Rebellion',
    },
    {
      id: '2',
      name: 'Darth Vader',
      side: 'DARK',
      abilities: { power: 'Force Choke', midichlorian: 27000 },
      createdTimestamp: Date.now(),
      description: 'Dark Lord of the Sith',
    },
    {
      id: '3',
      name: 'Yoda',
      side: 'LIGHT',
      abilities: { power: 'Force Wisdom', midichlorian: 17500 },
      createdTimestamp: Date.now(),
      description: 'Jedi Grand Master',
    },
    {
      id: '4',
      name: 'Boba Fett',
      side: 'DARK',
      abilities: { power: 'Bounty Hunting', midichlorian: 0 },
      createdTimestamp: Date.now(),
      description: 'Legendary Bounty Hunter',
    },
    {
      id: '5',
      name: 'Rey',
      side: 'LIGHT',
      abilities: { power: 'Force', midichlorian: 12000 },
      createdTimestamp: Date.now(),
      description: 'Last Jedi of the new era',
    },
    {
      id: '6',
      name: 'General Grievous',
      side: 'DARK',
      abilities: { power: 'Lightsaber Combat', midichlorian: 0 },
      createdTimestamp: Date.now(),
      description: 'Cyborg Supreme Commander',
    },
    {
      id: '7',
      name: 'Han Solo',
      side: 'LIGHT',
      abilities: { power: 'Piloting', midichlorian: 0 },
      createdTimestamp: Date.now(),
      description: 'Smuggler and Rebel General',
    },
    {
      id: '8',
      name: 'Obi-Wan Kenobi',
      side: 'LIGHT',
      abilities: { power: 'Force', midichlorian: 13000 },
      createdTimestamp: Date.now(),
      description: 'Jedi Master and General',
    },
    {
      id: '9',
      name: 'Darth Maul',
      side: 'DARK',
      abilities: { power: 'Double-bladed Combat', midichlorian: 12000 },
      createdTimestamp: Date.now(),
      description: 'Sith Lord',
    },
    {
      id: '10',
      name: 'Stormtrooper',
      side: 'DARK',
      abilities: { power: 'Marksmanship', midichlorian: 0 },
      createdTimestamp: Date.now(),
      description: 'Imperial Soldier',
    },
    {
      id: '11',
      name: 'Captain Phasma',
      side: 'DARK',
      abilities: { power: 'Leadership', midichlorian: 0 },
      createdTimestamp: Date.now(),
      description: 'First Order Captain',
    },
    {
      id: '12',
      name: 'Anakin Skywalker',
      side: 'LIGHT',
      abilities: { power: 'Force', midichlorian: 27000 },
      createdTimestamp: Date.now(),
      description: 'Jedi Knight before turning to the dark side',
    },
  ];

  ngOnInit() {
    // Register Swiper custom elements
    register();
  }

  getCharacterImage(name: string): string {
    // Convert character name to lowercase and handle special cases
    let imageName = name.toLowerCase().replace(/\s+/g, '');

    // Map character names to their image filenames
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

    return nameMap[imageName] || 'luke'; // Default to luke if no match
  }
}
