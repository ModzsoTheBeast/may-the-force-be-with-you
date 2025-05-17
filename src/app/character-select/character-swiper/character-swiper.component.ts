import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { ExtendedCharacter } from '@app/@types';
import { CharacterImageComponent } from '@shared/character-image/character-image.component';
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
  hasActionButtons = input<boolean>(true);
  
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

  slidePrev(): void {
    const container = this.swiperContainer();
    if (container && container.nativeElement.swiper) {
      container.nativeElement.swiper.slidePrev();
      const swiper = container.nativeElement.swiper;

      if (!swiper) {
        console.error('Swiper not initialized properly');
        return;
      }

      const currentIndex = container.nativeElement.swiper.activeIndex;
      this.onSwipeEvent.emit(currentIndex);

    }
  }

  slideNext(): void {
    const container = this.swiperContainer();
    if (container && container.nativeElement.swiper) {
      container.nativeElement.swiper.slideNext();
      const swiper = container.nativeElement.swiper;

      if (!swiper) {
        console.error('Swiper not initialized properly');
        return;
      }

      const currentIndex = container.nativeElement.swiper.activeIndex;
      this.onSwipeEvent.emit(currentIndex);
    }
  }
}
