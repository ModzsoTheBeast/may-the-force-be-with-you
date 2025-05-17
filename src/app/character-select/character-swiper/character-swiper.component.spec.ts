import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSwiperComponent } from './character-swiper.component';

describe('CharacterSwiperComponent', () => {
  let component: CharacterSwiperComponent;
  let fixture: ComponentFixture<CharacterSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSwiperComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSwiperComponent);
    fixture.componentRef.setInput('characters', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
