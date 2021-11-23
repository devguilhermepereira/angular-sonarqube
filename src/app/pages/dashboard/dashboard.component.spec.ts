import {DashboardComponent} from './dashboard.component';
import {UserModel} from "../../core/models/user.model";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let spinnerServiceMock: any;
  let userServiceMock: any;
  let routerMock: any;
  let rolesServiceMock: any;

  beforeEach(async () => {
    // instancia variavel mock para spinner
    spinnerServiceMock = {
      show: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      hide: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    // instancia variavel mock do serviço User
    userServiceMock = {
      get: jest.fn().mockReturnValue(new Observable<Array<any>>())
    };
    // instancia variavel mock para router Modulo de rotas do Angular
    routerMock = {
      navigate: jest.fn(),
    }
    // instancia variavel mock do serviço Roles
    rolesServiceMock = {
      get: jest.fn().mockReturnValue(new Observable<Array<any>>()),
    };
    component = new DashboardComponent(spinnerServiceMock, userServiceMock, routerMock, rolesServiceMock);
  });

  it('Iniciar component', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(ngOnInitSpy).toBeTruthy();
  });

  it('Depois de iniciar o component', () => {
    const ngAfterViewInitSpy = jest.spyOn(component, 'ngAfterViewInit');
    component.ngAfterViewInit();
    expect(ngAfterViewInitSpy).toBeTruthy();
  });

  it('Ativar spinner', () => {
    spinnerServiceMock.show();
    expect(component).toBeTruthy();
  });

  it('Desativar spinner', () => {
    spinnerServiceMock.hide();
    expect(component).toBeTruthy();
  });

  it('Pegar os usuários', () => {
    const getUsersSpy = jest.spyOn(component, 'getUsers');
    component.getUsers();
    userServiceMock.get().subscribe((res:any) => {
      component.users = JSON.parse(JSON.stringify(res));
      component.dataSource = new MatTableDataSource(res);
      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
      setTimeout(() => component.setUsersRoles(), 1000);
    });
    expect(getUsersSpy).toBeTruthy();
  });

  it('Executar filtro pelo nome', () => {
    const filtroSpy = jest.spyOn(component, 'filtro');
    const event: any = 'Amanda';
    component.filtro(event);
    if (component.dataSource.paginator) {
      component.dataSource.paginator.firstPage();
    }
    expect(filtroSpy).toBeTruthy();
  });

  it('Testar Paginação', () => {
    if (component.dataSource.paginator) {
      component.dataSource.paginator.firstPage();
    }
    expect(component).toBeTruthy();
  });

  it('Executar filtro pelo email', () => {
    const filtroSpy = jest.spyOn(component, 'filtro');
    const event: any = 'teste@email.com';
    if (component.dataSource.paginator) {
      component.dataSource.paginator.firstPage();
    }
    component.filtro(event);
    expect(filtroSpy).toBeTruthy();
  });

  it('Editar Usuário', () => {
    const goEditSpy = jest.spyOn(component, 'goEdit');
    const user: UserModel = {
      id: '2',
      name: "Amanda Varaschin",
      email: "amandavaraschin@email.com",
      active: true
    }
    component.goEdit(user);
    expect(goEditSpy).toBeTruthy();
  });

  it('Executar setUsersRoles', () => {
    const setUsersRolesSpy = jest.spyOn(component, 'setUsersRoles');
    const user: UserModel = {
      id: '212321ASDSADAS',
      name: "teste",
      email: "teste@email.com",
      active: true,
      userType: {role: '123ASD'}
    };
    component.roles = [
      {name: 'Gerente RH', role: '123ASD'},
      {name: 'UX', role: 'ASDASD123'}
    ]
    component.dataSource = new MatTableDataSource([user]);
    component.setUsersRoles();
    expect(setUsersRolesSpy).toBeTruthy();
  });

  it('Executar setUsersRoles com role', () => {
    const setUsersRolesSpy = jest.spyOn(component, 'setUsersRoles');
    const user: UserModel = {
      id: '212321ASDSADAS',
      name: "teste",
      email: "teste@email.com",
      active: true,
      userType: {role: '123ASD'}
    };
    component.roles = [
      {name: 'Gerente RH', role: '123ASD'},
      {name: 'UX', role: 'ASDASD123'}
    ]
    component.userRoles = [{name: 'Gerente RH', role: '123ASD'}];
    component.dataSource = new MatTableDataSource([user]);
    component.setUsersRoles();
    expect(setUsersRolesSpy).toBeTruthy();
  });

  it('Executar getRoleName', () => {
    const user: any = {userType: {role: '123ASD'}};
    component.userRoles = [{name: 'Gerente RH', role: '123ASD'}];
    const roleName = component.getRoleName(user);
    expect(component.getRoleName(user)).toEqual(roleName);
  });

  it('Executar getRoleName sem user', () => {
    const user: any = {};
    component.userRoles = [{name: 'Gerente RH', role: '123ASD'}];
    const roleName = component.getRoleName(user);
    expect(component.getRoleName(user)).toEqual(roleName);
  });

  it('Executar getRoles', () => {
    const getRolesSpy = jest.spyOn(component, 'getRoles');
    const user: UserModel = {
      id: '212321ASDSADAS',
      name: "teste",
      email: "teste@email.com",
      active: true,
      userType: {role: '123ASD'}
    }
    component.getRoles();
    component.dataSource.data.push(user);
    rolesServiceMock.get().subscribe((data: any) => {
      component.userRoles = data;
      let roles: any = [];
      data.forEach((row: any) => roles.push({...row, value: 0}));
      component.roles = roles;
    });
    expect(getRolesSpy).toBeTruthy();
  });
});
