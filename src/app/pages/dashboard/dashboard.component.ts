import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from "../../core/services/user.service";
import {UserModel} from "../../core/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['name', 'email', 'active'];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private spinner: NgxSpinnerService, private userService: UserService, private router: Router) {
    spinner.show();
    this.dataSource = new MatTableDataSource([{}])
  }

  ngOnInit(): void {
    this.pegarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pegarUsuarios() {
    this.userService.get().then((res) => {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }, 3000);
    })
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement) ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(user: UserModel) {
    const userEdit = {name: user.name, email: user.email};
    localStorage.setItem('userEdit', JSON.stringify(userEdit));
    this.router.navigate(['/user/' + (user.id ? user.id : 66)])
  }
}


