import {MenuComponent} from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let routerMock: any;

  beforeEach(async () => {
    // instancia variavel mock para router Modulo de rotas do Angular
    routerMock = {
      navigate: jest.fn(),
    }
    component = new MenuComponent(routerMock);
  });

  it('Iniciar component', () => {
    expect(component).toBeTruthy();
  });

  it('Executar logout', () => {
    const logoutSpy = jest.spyOn(component, 'logout');
    component.logout();
    expect(logoutSpy).toBeTruthy();
  });
});
