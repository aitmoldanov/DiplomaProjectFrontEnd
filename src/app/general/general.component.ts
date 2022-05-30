import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {TeamMember, User} from '../Model/Team';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  userName: [string];
  userSurname: [string];
  response: [TeamMember];
  user: User;
  errorMessage = '';


  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    this.userService.getTeamMembers().subscribe(
      response => {
        this.response = response;
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );

    this.userService.getUserByUsername(this.tokenStorage.getUserName()).subscribe(
      response => {
        this.user = response[0];
        this.tokenStorage.saveUser(response[0]);
        console.log(this.tokenStorage.getUser());
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );

  }

}
