import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterModuleComponent } from './character-module.component';

describe('CharacterModuleComponent', () => {
  let component: CharacterModuleComponent;
  let fixture: ComponentFixture<CharacterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterModuleComponent);
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('subtitle', '');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
