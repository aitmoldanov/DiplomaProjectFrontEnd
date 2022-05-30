import {Component, OnInit, ViewChild} from '@angular/core';
import {Defence, Grade, User} from "../Model/Team";
import {UserService} from "../_services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {TokenStorageService} from "../_services/token-storage.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstname', 'grade', 'action'];
  dataSource = new MatTableDataSource<any>();

  isLoading = true;
  errorMessage = '';
  defences: Defence;
  defenceType = 'Pre-defense I';

  pageNumber: number = 1;
  VOForm: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.defenceType = this.tokenStorage.getDefenceType();

    this.userService.getDefences().subscribe(
      (response: Defence) => {
        this.defences = response;
        this.VOForm = this.fb.group({
          VORows: this.fb.array(this.defences[this.defenceType].map(val => this.fb.group({
              id: new FormControl(val.id),
              grade: new FormControl(val.grade),
              firstname: new FormControl(val.user.lastname + ' ' + val.user.firstname),
              userId: new FormControl(val.userId),
              action: new FormControl('existingRecord'),
              isEditable: new FormControl(true),
              isNewRow: new FormControl(false),
            })
          )) //end of fb arrayeee
        }); // end of form group cretation
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.userService.getUsers().subscribe(
      response => {
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  }


  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0,this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls);
    // control.controls.unshift(this.initiateVOForm());
    // this.openPanel(panel);
    // this.table.renderRows();
    // this.dataSource.data = this.dataSource.data;
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {
    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;
  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i, element) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    console.log(element.value);
    this.userService.updateUser(element.value.userId, element.value.id, element.value.grade).subscribe(
      response => {
        console.log(response);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }


  initiateVOForm(): FormGroup {
    return this.fb.group({
      id: new FormControl(1),
      grade: new FormControl('sdfsdfsdf'),
      firstname: new FormControl("dasd"),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }
}
