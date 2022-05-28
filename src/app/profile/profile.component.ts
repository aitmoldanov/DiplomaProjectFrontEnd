import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  teamId: number;
  teamName: string;
  teamTheme: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTeams().subscribe(
      response => {
        this.teamId = response.id;
        this.teamName = response.name;
        this.teamTheme = response.theme;
        console.log(this.teamTheme);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
