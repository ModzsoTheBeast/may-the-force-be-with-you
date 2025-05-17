import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtendedCharacter, Side } from '@app/@types';
import { CharacterService } from '@shared/services/character.service';

import { CharacterSelectComponent } from './character-select.component';

describe('CharacterSelectComponent', () => {
  let component: CharacterSelectComponent;
  let fixture: ComponentFixture<CharacterSelectComponent>;
  let mockCharacterService: jasmine.SpyObj<CharacterService>;

  const mockCharacters: ExtendedCharacter[] = [
    {
      id: 'luke',
      name: 'Luke Skywalker',
      side: Side.LIGHT,
      abilities: {
        power: 'The Force',
        midichlorian: 15000,
      },
      description: 'Jedi Knight',
      createdTimestamp: Date.now(),
      selected: false,
      visible: true,
      health: 100,
      uuid: '123',
    },
  ];

  beforeEach(async () => {
    mockCharacterService = jasmine.createSpyObj('CharacterService', [
      'loadCharacters',
      'updateCharacters',
    ]);

    // Configure the loadCharacters method to return a signal with our mock data
    mockCharacterService.loadCharacters.and.returnValue(
      signal(mockCharacters).asReadonly()
    );

    // Set up characters getter to return our mock data
    Object.defineProperty(mockCharacterService, 'characters', {
      get: () => mockCharacters,
    });

    await TestBed.configureTestingModule({
      imports: [CharacterSelectComponent],
      providers: [
        provideHttpClient(),
        { provide: CharacterService, useValue: mockCharacterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
