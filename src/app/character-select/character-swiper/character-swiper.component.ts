import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { ExtendedCharacter } from '@app/@types';
import { CharacterImageComponent } from '@shared/character-image/character-image.component';
import { register, SwiperContainer } from 'swiper/element';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-character-swiper',
  imports: [CharacterImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './character-swiper.component.html',
  styleUrl: './character-swiper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSwiperComponent implements OnInit, AfterViewInit {
  swiperContainer: Signal<ElementRef<SwiperContainer>> =
    viewChild.required<ElementRef<SwiperContainer>>('swiperContainer');
  characters: InputSignal<ExtendedCharacter[]> =
    input.required<ExtendedCharacter[]>();
  onSwipeEvent: OutputEmitterRef<number> = output<number>();
  hasActionButtons: InputSignal<boolean> = input<boolean>(true);
  currentIndex: WritableSignal<number> = signal<number>(0);
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.slidePrev();
    } else if (event.key === 'ArrowRight') {
      this.slideNext();
    }
  }

  ngOnInit(): void {
    register();
  }

  ngAfterViewInit(): void {
    const container: ElementRef<SwiperContainer> = this.swiperContainer();
    if (container) {
      const swiper: Swiper = container.nativeElement.swiper;

      if (!swiper) {
        console.error('Swiper not initialized properly');
        return;
      }

      swiper.on('slideChange', (swiper: Swiper) => {
        this.currentIndex.set(swiper.activeIndex);
        this.onSwipeEvent.emit(this.currentIndex());
      });
    }
  }

  slidePrev(): void {
    const container: ElementRef<SwiperContainer> = this.swiperContainer();
    if (container && container.nativeElement.swiper) {
      container.nativeElement.swiper.slidePrev();
    }
  }

  slideNext(): void {
    const container: ElementRef<SwiperContainer> = this.swiperContainer();
    if (container && container.nativeElement.swiper) {
      container.nativeElement.swiper.slideNext();
    }
  }

  slide(index: number) {
    const container: ElementRef<SwiperContainer> = this.swiperContainer();
    if (container && container.nativeElement.swiper) {
      container.nativeElement.swiper.slideTo(index);
    }
  }
}
