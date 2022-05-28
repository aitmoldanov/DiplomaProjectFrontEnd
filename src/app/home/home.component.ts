import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject<any>();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  isEmpty: boolean;
  jsonData: any;
  worksheet: any;
  errorMessage = '';
  data: any[];

  constructor(private userService: UserService) { }

  onChange(evt) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = XLSX.utils.sheet_to_json(ws);
        this.jsonData = XLSX.utils.sheet_to_json(ws);
        this.jsonData = JSON.stringify(this.jsonData);

        if (this.jsonData === '') {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        // const info: Blob = new Blob([this.jsonData], { type: "application/json" });
        // FileSaver.saveAs(info, 'JsonFile' + new Date().getTime() + '.json');

        this.userService.uploadList(this.jsonData).subscribe(
          response => {
            console.log(this.data);
            this.isEmpty = false;
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(this.data[0]);
        this.dataSheet.next(this.data);
      };
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  uploadList() {
    this.userService.uploadList(this.jsonData).subscribe(
      response => {
        console.log(this.data);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = [];
  }

}
