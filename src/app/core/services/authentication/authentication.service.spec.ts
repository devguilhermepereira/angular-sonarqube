import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let firestoreMock: any;

  beforeEach(() => {
    const valueChanges = {
      valueChanges: jest.fn().mockReturnValue(new Observable<Array<any>>())
    }
    firestoreMock = {
      collection: jest.fn().mockReturnValue(valueChanges),
    }
    service = new AuthenticationService(firestoreMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Executar GET', () => {
    const loginSpy = jest.spyOn(service, 'login');
    const user = {email: 'admin@admin', password: '1'};
    service.login(user);
    expect(loginSpy).toBeTruthy();
  });
});
