import { AsyncPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize, screenSizeObservable } from '@app/@shared';
import { CharacterService } from '@app/@shared/services/character.service';
import { TimeService } from '@app/@shared/services/time.service';
import { Direction, ExtendedCharacter, Side } from '@app/@types';
import { CharacterImageComponent } from '@shared/character-image/character-image.component';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-simulation',
  imports: [
    PageShellComponent,
    CharacterImageComponent,
    DynamicButtonComponent,
    NgStyle,
    AsyncPipe,
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationComponent implements OnInit, OnDestroy {
  characterService: CharacterService = inject(CharacterService);
  timeService: TimeService = inject(TimeService);
  characters = signal<ExtendedCharacter[]>([]);
  currentTurn = signal<number>(0);
  attacker = signal<ExtendedCharacter | null>(null);
  lightCharacter = computed(() => {
    return this.characters().find(char => char.side === Side.LIGHT);
  });
  darkCharacter = computed(() => {
    return this.characters().find(char => char.side === Side.DARK);
  });
  winner = computed(() => {
    const light = this.lightCharacter();
    const dark = this.darkCharacter();

    if (light && light.health <= 0) {
      return dark;
    } else if (dark && dark.health <= 0) {
      return light;
    }

    return null;
  });
  protected readonly Direction = Direction;
  protected readonly Side = Side;
  private router: Router = inject(Router);
  private destroy$ = new Subject<void>();
  private attackInterval = 2; // 2 seconds
  private combatStartTime: number = 0;

  ngOnInit(): void {
    const selectedCharacters = this.characterService.selectedCharacters();
    this.characters.set(selectedCharacters || []);
    this.startCombat();
  }

  ngOnDestroy(): void {
    this.stopCombat();
  }

  back() {
    this.stopCombat();
    this.router.navigate(['charanter-select']);
  }

  private startCombat(): void {
    this.combatStartTime = Math.floor(Date.now() / 1000);
    this.determineAttacker();

    this.timeService
      .getElapsedTime(this.combatStartTime)
      .pipe(
        takeUntil(this.destroy$),
        filter(elapsed => elapsed % this.attackInterval === 0 && elapsed > 0),
        map(elapsed => Math.floor(elapsed / this.attackInterval))
      )
      .subscribe(turnCount => {
        if (turnCount > this.currentTurn()) {
          if (!this.winner()) {
            this.attack();
            this.currentTurn.set(turnCount);
            this.determineAttacker();
          } else {
            this.stopCombat();
          }
        }
      });
  }

  private stopCombat(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private determineAttacker(): void {
    const turn = this.currentTurn();
    const light = this.lightCharacter();
    const dark = this.darkCharacter();

    if (!light || !dark) return;

    if (turn % 2 === 0) {
      this.attacker.set(light);
    } else {
      this.attacker.set(dark);
    }
  }

  private attack(): void {
    const attacker = this.attacker();
    if (!attacker) return;

    const defender =
      attacker.side === Side.LIGHT
        ? this.darkCharacter()
        : this.lightCharacter();

    if (!defender) return;

    const damage = Math.floor(Math.random() * 10) + 10;

    const updatedCharacters = this.characters().map(char => {
      if (char.id === defender.id) {
        return {
          ...char,
          health: Math.max(0, char.health - damage),
        };
      }
      return char;
    });

    this.characters.set(updatedCharacters);
  }

  protected readonly screenSizeObservable = screenSizeObservable;
  protected readonly ScreenSize = ScreenSize;
}
