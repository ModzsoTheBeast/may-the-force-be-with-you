import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PageShellComponent} from "@shared/page-shell/page-shell.component";

@Component({
  selector: 'app-simulation',
    imports: [
        PageShellComponent
    ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationComponent {}
