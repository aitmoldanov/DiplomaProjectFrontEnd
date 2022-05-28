import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Defence, Subject, TeamMember} from '../Model/Team';

@Component({
  selector: 'app-grading-teams',
  templateUrl: './grading-teams.component.html',
  styleUrls: ['./grading-teams.component.css']
})
export class GradingTeamsComponent implements OnInit {
  teamId: [number];
  defenceName: [string];
  errorMessage: string;

  userName: [string];
  userSurname: [string];
  response: [Defence];
  teamMembers: [TeamMember];
  subjects: [Subject];

  positions: string[];
  isStudent: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDefences().subscribe(
      response => {
        this.response = response;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

    this.userService.getTeamMembers().subscribe(
      response => {
        this.teamMembers = response;
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

    this.userService.getSubjects().subscribe(
      response => {
        this.subjects = response;
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
