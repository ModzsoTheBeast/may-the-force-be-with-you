import { AsyncPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSize, screenSizeObservable } from '@app/@shared';
import { CharacterService } from '@app/@shared/services/character.service';
import { TimeService } from '@app/@shared/services/time.service';
import { Direction, ExtendedCharacter, Side } from '@app/@types';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';

import { FighterComponent } from './fighter/fighter.component';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [PageShellComponent, NgStyle, AsyncPipe, FighterComponent],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationComponent implements OnInit, OnDestroy {
  characterService: CharacterService = inject(CharacterService);
  timeService: TimeService = inject(TimeService);
  characters: WritableSignal<ExtendedCharacter[]> = signal<ExtendedCharacter[]>(
    []
  );
  currentTurn: WritableSignal<number> = signal<number>(0);
  attacker: WritableSignal<ExtendedCharacter | null> =
    signal<ExtendedCharacter | null>(null);
  lightCharacter: Signal<ExtendedCharacter | undefined> = computed(
    (): ExtendedCharacter | undefined => {
      return this.characters().find(
        (char: ExtendedCharacter): boolean => char.side === Side.LIGHT
      );
    }
  );
  darkCharacter: Signal<ExtendedCharacter | undefined> = computed(
    (): ExtendedCharacter | undefined => {
      return this.characters().find(
        (char: ExtendedCharacter): boolean => char.side === Side.DARK
      );
    }
  );
  winner: Signal<ExtendedCharacter | undefined | null> = computed(
    (): ExtendedCharacter | undefined | null => {
      const light: ExtendedCharacter | undefined = this.lightCharacter();
      const dark: ExtendedCharacter | undefined = this.darkCharacter();

      if (light && light.health <= 0) {
        return dark;
      } else if (dark && dark.health <= 0) {
        return light;
      }

      return null;
    }
  );
  protected readonly Direction: typeof Direction = Direction;
  protected readonly Side: typeof Side = Side;
  protected readonly screenSizeObservable: () => Observable<ScreenSize> =
    screenSizeObservable;
  protected readonly ScreenSize: typeof ScreenSize = ScreenSize;
  private router: Router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  private attackInterval: number = 2;
  private combatStartTime: number = 0;

  ngOnInit(): void {
    const selectedCharacters: ExtendedCharacter[] | undefined =
      this.characterService.selectedCharacters();
    this.characters.set(selectedCharacters || []);
    this.startCombat();
  }

  ngOnDestroy(): void {
    this.stopCombat();
  }

  back(): void {
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
        filter(
          (elapsed: number): boolean =>
            elapsed % this.attackInterval === 0 && elapsed > 0
        ),
        map((elapsed: number): number =>
          Math.floor(elapsed / this.attackInterval)
        )
      )
      .subscribe((turnCount: number) => {
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
    const turn: number = this.currentTurn();
    const light: ExtendedCharacter | undefined = this.lightCharacter();
    const dark: ExtendedCharacter | undefined = this.darkCharacter();

    if (!light || !dark) return;

    if (turn % 2 === 0) {
      this.attacker.set(light);
    } else {
      this.attacker.set(dark);
    }
  }

  private attack(): void {
    const attacker: ExtendedCharacter | null = this.attacker();
    if (!attacker) return;

    const defender: ExtendedCharacter | undefined =
      attacker.side === Side.LIGHT
        ? this.darkCharacter()
        : this.lightCharacter();

    if (!defender) return;

    const damage: number = Math.floor(Math.random() * 10) + 10;

    const updatedCharacters: ExtendedCharacter[] = this.characters().map(
      (char: ExtendedCharacter): ExtendedCharacter => {
        if (char.id === defender.id) {
          return {
            ...char,
            health: Math.max(0, char.health - damage),
          };
        }
        return char;
      }
    );

    this.characters.set(updatedCharacters);
  }
}
