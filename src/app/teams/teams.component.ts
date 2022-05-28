import { Component, OnInit } from '@angular/core';
import {Grade, User, UserColumns} from "../Model/Team";
import {UserService} from "../_services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<Grade>();
  valid: any = {};

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log(res);
      console.log(this.dataSource.data);
    });
  }

  editRow(row: Grade) {
      this.userService.updateUser(row.userId, row.id, row.grade).subscribe(() => {
        console.log(row.id);
        row.isEdit = false;
      });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
