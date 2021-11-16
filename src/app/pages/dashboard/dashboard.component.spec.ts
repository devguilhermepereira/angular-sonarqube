import {DashboardComponent} from './dashboard.component';
import {MatTableDataSource} from "@angular/material/table";
import Mock from '../../../../mock/user.json';
import {UserModel} from "../../core/models/user.model";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let spinnerServiceMock: any;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // instancia variavel mock para spinner
    spinnerServiceMock = {
      show: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      hide: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    // instancia variavel mock do serviço User
    userServiceMock = {
      get: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    // instancia variavel mock para router Modulo de rotas do Angular
    routerMock = {
      navigate: jest.fn(),
    }
    component = new DashboardComponent(spinnerServiceMock, userServiceMock, routerMock);
  });

  it('Iniciar component', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(ngOnInitSpy).toBeTruthy();
  });

  it('Ativar spinner', () => {
    spinnerServiceMock.show();
    expect(component).toBeTruthy();
  });

  it('Desativar spinner', () => {
    spinnerServiceMock.hide();
    expect(component).toBeTruthy();
  });

  it('Depois de iniciar o component', () => {
    const ngAfterViewInitSpy = jest.spyOn(component, 'ngAfterViewInit');
    component.ngAfterViewInit();
    expect(ngAfterViewInitSpy).toBeTruthy();
  });

  it('Pegar os usuários', () => {
    const pegarUsuariosSpy = jest.spyOn(component, 'pegarUsuarios');
    component.pegarUsuarios();
    setTimeout(() => {
      component.dataSource = new MatTableDataSource(Mock.users);
      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
      spinnerServiceMock.hide();
    }, 3000);
    expect(pegarUsuariosSpy).toBeTruthy();
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
    const editarSpy = jest.spyOn(component, 'editar');
    const user: UserModel = {
      id: 2,
      name: "Amanda Varaschin",
      email: "amandavaraschin@email.com",
      active: true
    }
    component.editar(user);
    const userEdit = {name: user.name, email: user.email};
    localStorage.setItem('userEdit', JSON.stringify(userEdit));
    routerMock.navigate(['/user/' + (user.id ? user.id : 66)])
    expect(editarSpy).toBeTruthy();
  });
});
