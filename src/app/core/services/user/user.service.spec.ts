import {UserService} from './user.service';
import {Observable} from "rxjs";
import {UserModel} from "../../models/user.model";
import {map} from "rxjs/operators";
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;

describe('UserService', () => {
  let service: UserService;
  let firestoreMock: any;

  beforeEach(() => {
    const collectionFunctionsMock = {
      valueChanges: jest.fn().mockReturnValue(new Observable<Array<any>>()),
      add: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    const docFunctionsMock = {
      update: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    firestoreMock = {
      collection: jest.fn().mockReturnValue(collectionFunctionsMock),
      doc: jest.fn().mockReturnValue(docFunctionsMock),
    }
    service = new UserService(firestoreMock);
  });

  it('Iniciar service', () => {
    expect(service).toBeTruthy();
  });

  it('Executar find', () => {
    const findSpy = jest.spyOn(service, 'find');
    const id = '211332121322113sadad'
    service.find(id).subscribe((data: any) => {
      return
    });
    expect(findSpy).toBeTruthy();
  });

  it('Executar get', () => {
    const getSpy = jest.spyOn(service, 'get');
    service.get().subscribe((data: any) => {return});
    expect(getSpy).toBeTruthy();
  });

  it('Executar saveUserTypes', () => {
    const saveUserTypesSpy = jest.spyOn(service, 'saveUserTypes');
    const role = '123123dASDASDASd';
    const id = 'ASDASD12321321';
    service.saveUserTypes(role, id).then((data: any) => {
      return
    });
    expect(saveUserTypesSpy).toBeTruthy();
  });

  it('Executar upadateUserTypes', () => {
    const upadateUserTypesSpy = jest.spyOn(service, 'upadateUserTypes');
    const userOld: any = {id: '123123dASDASDASd', userType: {id: 'SADASWDASD65876'}};
    const role = 'ASDASD12321321';
    service.upadateUserTypes(role, userOld).then((data: any) => {
      return
    });
    expect(upadateUserTypesSpy).toBeTruthy();
  });

  it('Executar getUserTypes', () => {
    const saveUserTypesSpy = jest.spyOn(service, 'getUserTypes');
    const id = 'ASDASD12321321';
    service.getUserTypes(id).subscribe((data: any) => {
      return
    });
    expect(saveUserTypesSpy).toBeTruthy();
  });

  it('Executar update', () => {
    const updateSpy = jest.spyOn(service, 'update');
    const role = 'a5s6d4a6s5d45asd4';
    const userOld = {
      userType: 'SAD12312ASD2131231',
      active: true,
      email: 'email@teste.com',
      name: 'Usuario Teste',
      id: 'SADASD2131231'
    };
    const data = new UserModel();
    data.userType = 'ASDQWFQW1231231';
    data.active = true;
    data.email = 'email@teste.com';
    data.name = 'Usuario Teste';
    service.update(data, role, userOld).then((data: any) => {
      return
    });
    expect(updateSpy).toBeTruthy();
  });

  it('Executar save', () => {
    const saveSpy = jest.spyOn(service, 'save');
    const role = 'a5s6d4a6s5d45asd4';
    const data = new UserModel();
    data.userType = '21312312321321fdsadsa';
    data.active = true;
    data.email = 'email@teste.com';
    data.name = 'Usuario Teste';
    service.save(data, role).then((res) => service.saveUserTypes(role, res.id))
    expect(saveSpy).toBeTruthy();
  });
});
