import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  computed,
  OnDestroy,
} from '@angular/core';
import { CharacterService } from '@app/@shared/services/character.service';
import { Direction, ExtendedCharacter, Side } from '@app/@types';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { CharacterImageComponent } from '../@shared/character-image/character-image.component';
import { DynamicButtonComponent } from '../@shared/dynamic-button/dynamic-button.component';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-simulation',
  imports: [
    PageShellComponent,
    CharacterImageComponent,
    DynamicButtonComponent,
    NgStyle
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationComponent implements OnInit, OnDestroy {
  characterService: CharacterService = inject(CharacterService);
  characters = signal<ExtendedCharacter[]>([]);
  private router: Router = inject(Router);
  protected readonly Direction = Direction;
  protected readonly Side = Side;

  // Combat system variables
  private attackIntervalId: number | null = null;
  private attackInterval = 2000; // 2 seconds
  currentTurn = signal<number>(0);
  attacker = signal<ExtendedCharacter | null>(null);

  lightCharacter = computed(() => {
    return this.characters().find((char) => char.side === Side.LIGHT);
  });

  darkCharacter = computed(() => {
    return this.characters().find((char) => char.side === Side.DARK);
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

  ngOnInit(): void {
    const selectedCharacters = this.characterService.selectedCharacters();
    this.characters.set(selectedCharacters || []);

    // Start combat system
    this.startCombat();
  }

  ngOnDestroy(): void {
    this.stopCombat();
  }

  private startCombat(): void {
    // Initial turn
    this.determineAttacker();

    // Start the turn interval
    this.attackIntervalId = window.setInterval(() => {
      if (!this.winner()) {
        this.attack();
        this.currentTurn.update((turn) => turn + 1);
        this.determineAttacker();
      } else {
        this.stopCombat();
      }
    }, this.attackInterval);
  }

  private stopCombat(): void {
    if (this.attackIntervalId !== null) {
      clearInterval(this.attackIntervalId);
      this.attackIntervalId = null;
    }
  }

  private determineAttacker(): void {
    const turn = this.currentTurn();
    const light = this.lightCharacter();
    const dark = this.darkCharacter();

    if (!light || !dark) return;

    // Alternate turns between light and dark
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

    // Calculate random damage between 1 and 10
    const damage = Math.floor(Math.random() * 10) + 1;

    // Update character health
    const updatedCharacters = this.characters().map((char) => {
      if (char.id === defender.id) {
        return {
          ...char,
          health: Math.max(0, char.health - damage), // Prevent negative health
        };
      }
      return char;
    });

    this.characters.set(updatedCharacters);
  }

  back() {
    this.stopCombat();
    this.router.navigate(['charanter-select']);
  }
}
