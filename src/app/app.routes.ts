import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CharacterSelectComponent } from './character-select/character-select.component';
import {authGuard} from '@shared/guards/auth.guard';
import {SimulationComponent} from '@app/simulation/simulation.component';
import {CharacterEditComponent} from '@app/character-edit/character-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/character-select', pathMatch: 'full' },
  { path: 'character-select', component: CharacterSelectComponent, canActivate: [authGuard] },
  { path: 'character-edit', component: CharacterEditComponent, canActivate: [authGuard] },
  { path: 'simulation/:id', component: SimulationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/character-select' }, //keep at the end
];
