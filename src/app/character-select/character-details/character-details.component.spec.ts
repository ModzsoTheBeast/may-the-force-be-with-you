import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ExtendedCharacter, Side } from '@app/@types';
import { CharacterService } from '@shared/services/character.service';
import { SimulateService } from '@shared/services/simulate.service';
import { of } from 'rxjs';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSimulateService: jasmine.SpyObj<SimulateService>;
  let mockCharacterService: jasmine.SpyObj<CharacterService>;

  const mockCharacter: ExtendedCharacter = {
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
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSimulateService = jasmine.createSpyObj('SimulateService', [
      'startSimulation',
    ]);
    mockCharacterService = jasmine.createSpyObj('CharacterService', [
      'updateCharacters',
    ]);

    mockSimulateService.startSimulation.and.returnValue(
      of({ simulationId: 'sim123' })
    );

    Object.defineProperty(mockCharacterService, 'characters', {
      get: () => [mockCharacter],
    });

    await TestBed.configureTestingModule({
      imports: [CharacterDetailsComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: mockRouter },
        { provide: SimulateService, useValue: mockSimulateService },
        { provide: CharacterService, useValue: mockCharacterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    fixture.componentRef.setInput('visibleCharacter', mockCharacter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
