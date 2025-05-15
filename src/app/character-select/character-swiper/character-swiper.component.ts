import {
  Component,
  ChangeDetectionStrategy,
  input,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  viewChild,
  ElementRef,
  effect,
  AfterViewInit,
  output,
} from '@angular/core';
import { CharacterImageComponent } from '@shared/character-image/character-image.component';
import { ExtendedCharacter } from '@app/@types';
import { register, SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-character-swiper',
  imports: [CharacterImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './character-swiper.component.html',
  styleUrl: './character-swiper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSwiperComponent implements OnInit, AfterViewInit {
  swiperContainer =
    viewChild.required<ElementRef<SwiperContainer>>('swiperContainer');
  characters = input.required<ExtendedCharacter[]>();
  onSwipeEvent = output<number>();

  ngOnInit(): void {
    register();
  }

  ngAfterViewInit() {
    const container = this.swiperContainer();
    if (container) {
      const swiper = container.nativeElement.swiper;

      if (!swiper) {
        console.error('Swiper not initialized properly');
        return;
      }

      swiper.on('slideChange', () => {
        const currentIndex = container.nativeElement.swiper.activeIndex;
        this.onSwipeEvent.emit(currentIndex);
      });
    }
  }
}
