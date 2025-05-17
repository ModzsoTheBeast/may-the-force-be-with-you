import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CharacterSidebarComponent } from '@app/@shared/character-sidebar/character-sidebar.component';
import { CharacterService } from '@app/@shared/services/character.service';
import { ExtendedCharacter } from '@app/@types';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { v4 as uuidv4 } from 'uuid';

type SortableValue = string | number;

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
export class CharacterEditComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  selectedCharacter = signal<ExtendedCharacter | null>(null);
  sortColumn = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  characters = computed(() => {
    const chars = this.characterService.characters;
    if (!chars) return undefined;

    const column = this.sortColumn();
    const direction = this.sortDirection();

    return [...chars].sort((a, b) => {
      let valueA: SortableValue;
      let valueB: SortableValue;

      // Handle nested properties
      if (column === 'power') {
        valueA = a.abilities.power;
        valueB = b.abilities.power;
      } else if (column === 'midichlorian') {
        valueA = Number(a.abilities.midichlorian);
        valueB = Number(b.abilities.midichlorian);
      } else {
        valueA = a[column as keyof ExtendedCharacter] as SortableValue;
        valueB = b[column as keyof ExtendedCharacter] as SortableValue;
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

  private characterService: CharacterService = inject(CharacterService);
  private router: Router = inject(Router);
  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    this.characterService.loadCharacters();
  }

  ngAfterViewInit() {
    this.setupStickyHeaderDetection();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  deleteCharacter(character: ExtendedCharacter) {
    if (!this.characterService.characters) return;

    const updatedCharacters = this.characterService.characters.filter(
      char => char.uuid !== character.uuid
    );

    this.characterService.updateCharacters(updatedCharacters);
  }

  editCharacter(character: ExtendedCharacter) {
    this.selectedCharacter.set(character);
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
    this.selectedCharacter.set(null);
  }

  sort(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.update((current: 'asc' | 'desc') =>
        current === 'asc' ? 'desc' : 'asc'
      );
    } else {
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

  private setupStickyHeaderDetection() {
    const tableContainer =
      this.elementRef.nativeElement.querySelector('.table-responsive');
    const tableHeader = this.elementRef.nativeElement.querySelector('thead');

    if (!tableContainer || !tableHeader) return;

    this.scrollListener = this.renderer.listen(tableContainer, 'scroll', () => {
      const scrollTop = tableContainer.scrollTop;
      if (scrollTop > 0) {
        this.renderer.addClass(tableHeader, 'sticky');
      } else {
        this.renderer.removeClass(tableHeader, 'sticky');
      }
    });
  }
}
