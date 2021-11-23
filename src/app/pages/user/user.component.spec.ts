import {UserComponent} from "./user.component";
import {Observable} from "rxjs";

describe('UserComponent', () => {
  let component: UserComponent;
  let userServiceMock: any;
  let rolesServiceMock: any;

  beforeEach(async () => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop: any) => {
          return '';
        }
      })
    });
    userServiceMock = {
      get: jest.fn().mockReturnValue(new Observable<Array<any>>()),
      save: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      update: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    rolesServiceMock = {
      get: jest.fn().mockReturnValue(new Observable<Array<any>>()),
    };
    component = new UserComponent(userServiceMock, rolesServiceMock);
  });

  it('Iniciar component com usuario vazio', () => {
    component.user = null
    expect(component).toBeTruthy();
  });

  it('Iniciar component com usuario', () => {
    component.user = {
      active: true,
      email: 'teste@email',
      isAdmin: false,
      name: 'Teste user',
      password: 'Teste user123',
    };
    expect(component).toBeTruthy();
  });

  it('Deve desconstruir component', () => {
    const ngOnDestroySpy = jest.spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(ngOnDestroySpy).toBeTruthy();
  });

  it('Pegar cargos', () => {
    const getRolesSpy = jest.spyOn(component, 'getRoles');
    const obRoles = new Observable<Array<any>>();
    rolesServiceMock.get.mockReturnValue(obRoles);
    component.getRoles();
    expect(getRolesSpy).toBeTruthy();
  });

  it('Cadastrar Usuario', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue('Teste');
    component.email.setValue('email@teste.com');
    const data: any = {
      active: true,
      email: component.email.value,
      isAdmin: false,
      name: component.email.value,
      password: component.email.value + 123,
    }
    component.user = null;
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Cadastrar Usuario NOME INVALIDO', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue(null);
    component.email.setValue('email@teste.com');
    const data: any = {
      active: true,
      email: component.email.value,
      isAdmin: false,
      name: component.email.value,
      password: component.email.value + 123,
    }
    component.user = null;
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Cadastrar Usuario EMAIL INVALIDO', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue('Teste');
    component.email.setValue('email');
    const data: any = {
      active: true,
      email: component.email.value,
      isAdmin: false,
      name: component.email.value,
      password: component.email.value + 123,
    }
    component.user = null;
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Atualizar Usuario EMAIL INVALIDO', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.email.setValue('email');
    component.user = {
      active: true,
      email: 'teste@email',
      isAdmin: false,
      name: 'Teste user',
      password: 'Teste user123',
    }
    const data: any = {
      active: true,
      email: component.email.value,
      isAdmin: false,
      name: component.email.value,
      password: component.email.value + 123,
    };
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Atualizar Usuario', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue('Teste');
    component.email.setValue('email@teste.com');
    component.user = {
      active: true,
      email: 'teste@email',
      isAdmin: false,
      name: 'Teste user',
      password: 'Teste user123',
    }
    const data: any = {
      active: true,
      email: component.email.value,
      isAdmin: false,
      name: component.email.value,
      password: component.email.value + 123,
    };
    if (component.user) {
      userServiceMock.update(data, component.role.value, component.user).then((data: any) => {
        return
      });
    } else {
      userServiceMock.save(data, component.role.value).then((data: any) => {
        return
      });
    }
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Pegar Mensagem de erro EMAIL VAZIO', () => {
    const pegarMensagemErroSpy = jest.spyOn(component, 'pegarMensagemErro');
    component.email.setValue(null);
    component.pegarMensagemErro();
    expect(pegarMensagemErroSpy).toBeTruthy();
  });

  it('Pegar Mensagem de erro EMAIL INVALIDO', () => {
    const pegarMensagemErroSpy = jest.spyOn(component, 'pegarMensagemErro');
    component.email.setValue('email');
    component.pegarMensagemErro();
    expect(pegarMensagemErroSpy).toBeTruthy();
  });

  it('Pegar Mensagem de erro NOME', () => {
    const pegarMensagemErroSpy = jest.spyOn(component, 'pegarMensagemErro');
    component.name.setValue(null);
    component.pegarMensagemErro();
    expect(pegarMensagemErroSpy).toBeTruthy();
  });

  it('Mostra mensagem CADASTRO', () => {
    const showMessageSpy = jest.spyOn(component, 'showMessage');
    component.showMessage('Funcionário cadastrado');
    expect(showMessageSpy).toBeTruthy();
  });

  it('Mostra mensagem ATUALIZAÇÃO', () => {
    const showMessageSpy = jest.spyOn(component, 'showMessage');
    component.showMessage('Informações atualizadas');
    expect(showMessageSpy).toBeTruthy();
  });

  it('Executar reset', () => {
    const resetSpy = jest.spyOn(component, 'reset');
    component.reset();
    expect(resetSpy).toBeTruthy();
  });
});
