import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { CharacterService } from '@app/@shared/services/character.service';
import { ExtendedCharacter } from '@app/@types';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { CharacterSidebarComponent } from '@app/@shared/character-sidebar/character-sidebar.component';

@Component({
  selector: 'app-character-edit',
  standalone: true,
  imports: [
    CommonModule,
    PageShellComponent,
    DynamicButtonComponent,
    CharacterSidebarComponent,
  ],
  templateUrl: './character-edit.component.html',
  styleUrl: './character-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEditComponent implements OnInit {
  private characterService: CharacterService = inject(CharacterService);
  private router: Router = inject(Router);
  sidenav = signal<boolean>(false);
  selectedCharacter = signal<ExtendedCharacter | null>(null);

  ngOnInit() {
    this.characterService.loadCharacters();
  }

  private sortColumn = signal<string>('name');
  readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly characters = computed(() => {
    const chars = this.characterService.characters;
    if (!chars) return undefined;

    const column = this.sortColumn();
    const direction = this.sortDirection();

    return [...chars].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      // Handle nested properties
      if (column === 'power') {
        valueA = a.abilities.power;
        valueB = b.abilities.power;
      } else if (column === 'midichlorian') {
        valueA = a.abilities.midichlorian;
        valueB = b.abilities.midichlorian;
      } else {
        valueA = a[column as keyof ExtendedCharacter];
        valueB = b[column as keyof ExtendedCharacter];
      }

      // Compare values based on sort direction
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();
        return direction === 'asc'
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      }
    });
  });

  deleteCharacter(character: ExtendedCharacter) {
    if (!this.characterService.characters) return;

    const updatedCharacters = this.characterService.characters.filter(
      (char) => char.uuid !== character.uuid
    );

    this.characterService.updateCharacters(updatedCharacters);
  }

  editCharacter(character: ExtendedCharacter) {
    this.selectedCharacter.set(character);
    this.sidenav.set(true);
  }
  copyCharacter(character: ExtendedCharacter) {
    if (!this.characterService.characters) return;

    // Create a deep copy of the character
    const characterCopy: ExtendedCharacter = JSON.parse(
      JSON.stringify(character)
    );

    // Modify the name to indicate it's a copy
    characterCopy.name = `${character.name} (Copy)`;
    characterCopy.uuid = uuidv4();

    // Add the copy to the characters list
    const updatedCharacters = [
      ...this.characterService.characters,
      characterCopy,
    ];

    // Update the characters through the service
    this.characterService.updateCharacters(updatedCharacters);
  }

  back() {
    this.router.navigate(['charanter-select']);
  }

  addCharacter() {
    throw new Error('Method not implemented.');
  }

  sort(column: string) {
    if (this.sortColumn() === column) {
      // Toggle direction if same column is clicked
      this.sortDirection.update((current: 'asc' | 'desc') =>
        current === 'asc' ? 'desc' : 'asc'
      );
    } else {
      // Set new column and reset direction to ascending
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortDirection(column: string): string {
    if (this.sortColumn() !== column) return '';
    return this.sortDirection() === 'asc' ? 'ascending' : 'descending';
  }

  isSortedColumn(column: string): boolean {
    return this.sortColumn() === column;
  }
}
