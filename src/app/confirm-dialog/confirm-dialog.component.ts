import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {PotentialTeam} from "../Model/Team";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  errorMessage = '';
  potentialTeamsBeeingApproved: PotentialTeam[];
  potentialTeams: PotentialTeam[];

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.userService.getPotentialTeamsByUserId(this.tokenStorage.getUser().id).subscribe(
      response => {
        console.log(response);
        this.potentialTeams = response;
        this.userService.findAllByCreatorId(response[0].creatorId).subscribe(
          response1 => {
            this.potentialTeamsBeeingApproved = response1;
            console.log(response1);
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );
  }

  acceptInvite(): void {
    this.userService.acceptInvite(this.potentialTeams[0].id, 'ACCEPTED').subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
