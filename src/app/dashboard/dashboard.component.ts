import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Guilherme', 'Asher', 'Olivia', 'José', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Amanda', 'Lucas', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {
  
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  
  constructor(private spinner: NgxSpinnerService) {
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));    
    this.dataSource = new MatTableDataSource(users);
  }
  
  ngOnInit(): void {
    this.spinner.show();
    
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  createNewUser(id: number): UserData {
    const name = NAMES[Math.round(this.getRandomNumber() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(this.getRandomNumber() * (NAMES.length - 1))].charAt(0) + '.';
    
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(this.getRandomNumber() * 100).toString(),
      fruit: FRUITS[Math.round(this.getRandomNumber() * (FRUITS.length - 1))]
    };
  }

  getRandomNumber() {
    const crypto: any = window.crypto;
    const array = new Uint32Array(1);
    return Number('0.' + crypto.getRandomValues(array)[0]); 
  }
}


