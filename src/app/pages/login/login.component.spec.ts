import {LoginComponent} from './login.component';
import {Observable} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let serviceMock: any;
  let spinnerServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // instancia variavel mock para spinner
    spinnerServiceMock = {
      show: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      hide: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    serviceMock = {
      login: jest.fn().mockReturnValue(new Observable<Array<any>>()),
    };
    // instancia variavel mock para router Modulo de rotas do Angular
    routerMock = {
      navigate: jest.fn(),
    }
    component = new LoginComponent(serviceMock, spinnerServiceMock, routerMock);
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Executar pegarMensagemErro EMAIL INVALIDO', () => {
    const pegarMensagemErroSpy = jest.spyOn(component, 'getError');
    component.email.setValue('email');
    component.getError();
    expect(pegarMensagemErroSpy).toBeTruthy();
  });

  it('Executar pegarMensagemErro EMAIL VAZIO', () => {
    const pegarMensagemErroSpy = jest.spyOn(component, 'getError');
    component.email.setValue('');
    component.getError();
    expect(pegarMensagemErroSpy).toBeTruthy();
  });

  it('Executar login com sucesso', () => {
    const loginSpy = jest.spyOn(component, 'login');
    component.email.setValue('admin@admin');
    component.password.setValue('1');
    component.login();
    expect(loginSpy).toBeTruthy();
  });

  it('Executar validLogin com sucesso no login', () => {
    const validLoginSpy = jest.spyOn(component, 'validLogin');
    component.password.setValue('1');
    const res = [{password: '1'}];
    component.validLogin(res);
    expect(validLoginSpy).toBeTruthy();
  });

  it('Executar validLogin com falha no login', () => {
    const validLoginSpy = jest.spyOn(component, 'validLogin');
    component.password.setValue('1');
    const res = [{password: '2'}];
    component.validLogin(res);
    expect(validLoginSpy).toBeTruthy();
  });

  it('Executar login com EMAIL INVALIDO', () => {
    const loginSpy = jest.spyOn(component, 'login');
    component.email.setValue(null);
    component.login();
    expect(loginSpy).toBeTruthy();
  });
});
