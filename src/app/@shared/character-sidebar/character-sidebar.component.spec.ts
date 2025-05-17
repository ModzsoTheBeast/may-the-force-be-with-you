import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSidebarComponent } from './character-sidebar.component';

describe('CharacterSidebarComponent', () => {
  let component: CharacterSidebarComponent;
  let fixture: ComponentFixture<CharacterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSidebarComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
