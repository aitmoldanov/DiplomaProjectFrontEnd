import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Defence, Subject, TeamMember} from '../Model/Team';
import {TokenStorageService} from "../_services/token-storage.service";
import {Routes} from "@angular/router";

@Component({
  selector: 'app-grading-teams',
  templateUrl: './grading-teams.component.html',
  styleUrls: ['./grading-teams.component.scss']
})
export class GradingTeamsComponent implements OnInit {
  teamId: [number];
  defenceName: [string];
  errorMessage: string;

  roles: string[];
  userSurname: [string];
  response: Defence;
  teamMembers: [TeamMember];
  subjects: [Subject];
  isPassed: boolean;

  currentStatus: string;
  statuses: string[] = ['FAILED', 'PASSED', 'UNDEFINED'];

  numbers: string[] = ['1', '2', '3'];
  isStudent: boolean;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getDefences().subscribe(
      (response: Defence) => {
        this.response = response;
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

    this.userService.getTeamMembers().subscribe(
      response => {
        this.teamMembers = response;
        this.roles = response.map(val => val.role);
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

  setDefenceType(defenceType) {
    console.log(defenceType);
    this.tokenStorage.setDefenceType(defenceType);
  }

  editStatus(id, status) {
    this.userService.updateStatus(id, status).subscribe(
      response => {
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
