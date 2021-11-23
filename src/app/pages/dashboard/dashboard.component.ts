import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from "../../core/services/user/user.service";
import {UserModel} from "../../core/models/user.model";
import {Router} from "@angular/router";
import {RolesService} from "../../core/services/roles/roles.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public roles: any;
  public users: Array<UserModel> = [];
  public userRoles: any;
  public view: any = [500, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public displayedColumns: string[] = ['name', 'email', 'role', 'active'];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private spinner: NgxSpinnerService, private userService: UserService, private router: Router, private rolesService: RolesService) {
    this.dataSource = new MatTableDataSource([{}]);
    this.getRoles();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.spinner.show();
    this.reset();
  }

  setUsersRoles() {
    const usersRole = JSON.parse(JSON.stringify(this.roles));
    usersRole.forEach((row: any) => row.value = 0);
    this.dataSource.data.forEach((user: any) => {
      const index = usersRole.findIndex((a: any) => a.id === user['userType'].role);
      if (index >= 0) usersRole[index].value += 1;
    });
    this.roles = usersRole;
    this.spinner.hide();
  }

  getRoles() {
    let roles: any = [];
    this.rolesService.get().subscribe((res) => {
      this.userRoles = res;
      res.forEach((row: any) => roles.push({...row, value: 0}));
      this.roles = roles;
    });
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement) ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRoleName(user: UserModel): string {
    if (user && user.userType) {
      const index = this.userRoles.findIndex((row: any) => row.id === user.userType.role);
      return index >= 0 ? this.userRoles[index].name : '';
    } else return '';
  }

  goEdit(user: UserModel) {
    localStorage.setItem('userEdit', JSON.stringify(user));
    this.router.navigate(['/user/' + user.id]);
  }

  reset() {
    this.users = [];
    this.dataSource = new MatTableDataSource([{}]);
  }
}


