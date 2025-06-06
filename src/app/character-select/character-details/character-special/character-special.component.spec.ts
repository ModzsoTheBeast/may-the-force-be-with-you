import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSpecialComponent } from './character-special.component';

describe('CharacterSpecialComponent', () => {
  let component: CharacterSpecialComponent;
  let fixture: ComponentFixture<CharacterSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSpecialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSpecialComponent);
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('purpose', '');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
