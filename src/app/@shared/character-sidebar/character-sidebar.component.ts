import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  Signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CharacterForm, ExtendedCharacter, Side } from '@app/@types';
import { ElapsedTimePipe } from '@shared/pipes/elapsed-time.pipe';
import { Observable, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { CharacterImageComponent } from '../character-image/character-image.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { CharacterService } from '../services/character.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-character-sidebar',
  imports: [
    CharacterImageComponent,
    ReactiveFormsModule,
    DynamicButtonComponent,
    FormsModule,
    ElapsedTimePipe,
    AsyncPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './character-sidebar.component.html',
  styleUrl: './character-sidebar.component.scss',
})
export class CharacterSidebarComponent implements OnDestroy, AfterViewInit {
  closeBtn: Signal<ElementRef | undefined> = viewChild<ElementRef>('closeBtn');
  character: InputSignal<ExtendedCharacter | null> =
    input<ExtendedCharacter | null>(null);
  characterService: CharacterService = inject(CharacterService);
  timeService: TimeService = inject(TimeService);
  elementRef: ElementRef = inject(ElementRef);
  characters: ExtendedCharacter[] | undefined =
    this.characterService.characters;
  elapsedSeconds$: Observable<number> | null = null;
  characterForm: FormGroup<CharacterForm> = new FormGroup<CharacterForm>({
    avatar: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    power: new FormControl<string>('Erő használata', { nonNullable: true }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    side: new FormControl<Side>(Side.DARK, { nonNullable: true }),
    midiclorian: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });
  protected readonly Side: typeof Side = Side;
  private timeSubscription: Subscription | null = null;
  private sidebarElement: HTMLElement | null = null;
  private readonly hideEventHandler: (() => void) | null = null;

  constructor() {
    effect((): void => {
      const char: ExtendedCharacter | null = this.character();
      if (char) {
        this.unsubscribeFromTimeService();
        this.elapsedSeconds$ = this.timeService.getElapsedTime(
          char.createdTimestamp
        );
        this.timeSubscription = this.elapsedSeconds$.subscribe();
        this.characterForm.controls.avatar.setValue(char.id);
        this.characterForm.controls.side.setValue(char.side);
        this.characterForm.controls.midiclorian.setValue(
          char.abilities.midichlorian
        );
        this.characterForm.controls.name.setValue(char.name);
        this.characterForm.controls.description.setValue(char.description);
      } else {
        this.characterForm.reset();
      }
    });

    this.hideEventHandler = this.handleSidebarHide.bind(this);
  }

  ngAfterViewInit(): void {
    this.sidebarElement = this.elementRef.nativeElement.closest('.offcanvas');
    if (this.sidebarElement && this.hideEventHandler) {
      this.sidebarElement.addEventListener(
        'hide.bs.offcanvas',
        this.hideEventHandler
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFromTimeService();

    if (this.sidebarElement && this.hideEventHandler) {
      this.sidebarElement.removeEventListener(
        'hide.bs.offcanvas',
        this.hideEventHandler
      );
    }
  }

  submit(): void {
    if (this.characterForm.invalid) {
      this.characterForm.markAllAsTouched();
      return;
    }

    const formValues = this.characterForm.getRawValue();

    if (this.character()) {
      const updatedCharacter: ExtendedCharacter | null = this.character();
      if (!updatedCharacter || !this.characterService.characters) {
        return;
      }

      const updatedCharacters: ExtendedCharacter[] =
        this.characterService.characters.map(
          (char: ExtendedCharacter): ExtendedCharacter => {
            if (char.uuid === updatedCharacter.uuid) {
              return {
                ...char,
                id: formValues.avatar,
                name: formValues.name,
                side: formValues.side,
                description: formValues.description,
                abilities: {
                  power: formValues.power,
                  midichlorian: formValues.midiclorian,
                },
              };
            }
            return char;
          }
        );

      this.characterService.updateCharacters(updatedCharacters);
    } else {
      if (!this.characterService.characters) {
        return;
      }

      const newCharacter: ExtendedCharacter = {
        id: formValues.avatar,
        name: formValues.name,
        side: formValues.side,
        description: formValues.description,
        abilities: {
          power: formValues.power,
          midichlorian: formValues.midiclorian,
        },
        createdTimestamp: Date.now(),
        selected: false,
        visible: false,
        health: 100,
        uuid: uuidv4(),
      };

      const updatedCharacters: ExtendedCharacter[] = [
        ...this.characterService.characters,
        newCharacter,
      ];
      this.characterService.updateCharacters(updatedCharacters);
    }

    this.cancel();
  }

  cancel(): void {
    const closeBtn: ElementRef | undefined = this.closeBtn();
    if (closeBtn) {
      closeBtn.nativeElement.click();
    }
  }

  private handleSidebarHide(): void {
    this.unsubscribeFromTimeService();
  }

  private unsubscribeFromTimeService(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
      this.timeSubscription = null;
    }
    this.elapsedSeconds$ = null;
  }
}
