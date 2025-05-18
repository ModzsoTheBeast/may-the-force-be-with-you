import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CharacterSidebarComponent } from '@app/@shared/character-sidebar/character-sidebar.component';
import { CharacterService } from '@app/@shared/services/character.service';
import { ExtendedCharacter, Side } from '@app/@types';
import { DynamicButtonComponent } from '@shared/dynamic-button/dynamic-button.component';
import { PageShellComponent } from '@shared/page-shell/page-shell.component';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
export class CharacterEditComponent implements OnInit, AfterViewInit {
  tableContainer: Signal<ElementRef | undefined> =
    viewChild<ElementRef>('tableContainer');
  tableHeader: Signal<ElementRef | undefined> =
    viewChild<ElementRef>('tableHeader');

  selectedCharacter: WritableSignal<ExtendedCharacter | null> =
    signal<ExtendedCharacter | null>(null);
  sortColumn: WritableSignal<string> = signal<string>('name');
  sortDirection: WritableSignal<'asc' | 'desc'> = signal<'asc' | 'desc'>('asc');
  characters: Signal<ExtendedCharacter[] | undefined> = computed(
    (): ExtendedCharacter[] | undefined => {
      const chars: ExtendedCharacter[] | undefined =
        this.characterService.characters;
      if (!chars) return undefined;

      const column: string = this.sortColumn();
      const direction: 'asc' | 'desc' = this.sortDirection();

      return [...chars].sort((a: ExtendedCharacter, b: ExtendedCharacter) => {
        let valueA: SortableValue;
        let valueB: SortableValue;

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

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return direction === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          const stringA: string = String(valueA).toLowerCase();
          const stringB: string = String(valueB).toLowerCase();
          return direction === 'asc'
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
        }
      });
    }
  );

  protected readonly Side: typeof Side = Side;
  private characterService: CharacterService = inject(CharacterService);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  ngOnInit(): void {
    this.characterService.loadCharacters();
  }

  ngAfterViewInit(): void {
    this.setupStickyHeaderDetection();
  }

  deleteCharacter(character: ExtendedCharacter): void {
    if (!this.characterService.characters) return;

    const updatedCharacters: ExtendedCharacter[] =
      this.characterService.characters.filter(
        (char: ExtendedCharacter): boolean => char.uuid !== character.uuid
      );

    this.characterService.updateCharacters(updatedCharacters);
  }

  editCharacter(character: ExtendedCharacter): void {
    this.selectedCharacter.set(character);
  }

  copyCharacter(character: ExtendedCharacter): void {
    if (!this.characterService.characters) return;

    const characterCopy: ExtendedCharacter = JSON.parse(
      JSON.stringify(character)
    );

    characterCopy.name = `${character.name} (Copy)`;
    characterCopy.uuid = uuidv4();

    const updatedCharacters: ExtendedCharacter[] = [
      ...this.characterService.characters,
      characterCopy,
    ];

    this.characterService.updateCharacters(updatedCharacters);
  }

  back(): void {
    this.router.navigate(['charanter-select']);
  }

  addCharacter(): void {
    this.selectedCharacter.set(null);
  }

  sort(column: string): void {
    if (this.sortColumn() === column) {
      this.sortDirection.update((current: 'asc' | 'desc'): 'asc' | 'desc' =>
        current === 'asc' ? 'desc' : 'asc'
      );
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  private setupStickyHeaderDetection(): void {
    const tableContainer: ElementRef | undefined = this.tableContainer();
    const tableHeader: ElementRef | undefined = this.tableHeader();
    if (!tableContainer || !tableHeader) return;

    fromEvent(tableContainer.nativeElement, 'scroll')
      .pipe(debounceTime(10), takeUntilDestroyed(this.destroyRef))
      .subscribe((): void => {
        const scrollTop: number = tableContainer.nativeElement.scrollTop;
        if (scrollTop > 0) {
          this.renderer.addClass(tableHeader.nativeElement, 'sticky');
        } else {
          this.renderer.removeClass(tableHeader.nativeElement, 'sticky');
        }
      });
  }
}
