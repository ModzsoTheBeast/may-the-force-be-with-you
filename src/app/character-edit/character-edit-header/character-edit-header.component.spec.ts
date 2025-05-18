import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEditHeaderComponent } from './character-edit-header.component';

describe('CharacterEditHeaderComponent', () => {
  let component: CharacterEditHeaderComponent;
  let fixture: ComponentFixture<CharacterEditHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterEditHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
