import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtendedCharacter } from '@app/@types';

import { FighterComponent } from './fighter.component';

describe('FighterComponent', () => {
  let component: FighterComponent;
  let fixture: ComponentFixture<FighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FighterComponent);
    fixture.componentRef.setInput('character', {} as ExtendedCharacter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
