import {UserComponent} from "./user.component";

describe('UserComponent', () => {
  let component: UserComponent;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      get: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      save: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    component = new UserComponent(userServiceMock);
  });

  it('Iniciar component', () => {
    expect(component).toBeTruthy();
  });

  it('Cadastrar Usuario', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue('Teste');
    component.email.setValue('email@teste.com');
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Cadastrar Usuario NOME INVALIDO', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue(null);
    component.email.setValue('email@teste.com');
    component.cadastrar();
    expect(cadastrarSpy).toBeTruthy();
  });

  it('Cadastrar Usuario EMAIL INVALIDO', () => {
    const cadastrarSpy = jest.spyOn(component, 'cadastrar');
    component.name.setValue('Teste');
    component.email.setValue('email');
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

  it('Deve desconstruir component', () => {
    const ngOnDestroySpy = jest.spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(ngOnDestroySpy).toBeTruthy();
  });
});
