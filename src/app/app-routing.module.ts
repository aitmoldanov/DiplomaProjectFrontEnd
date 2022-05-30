import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {TeamsComponent} from './teams/teams.component';
import {GradingTeamsComponent} from './grading-teams/grading-teams.component';
import {GeneralComponent} from './general/general.component';
import {Error404Component} from "./error404/error404.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'grading-teams', component: GradingTeamsComponent},
  { path: 'general', component: GeneralComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: 'confirm-dialog', component: ConfirmDialogComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', pathMatch: 'full',
    component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
