import { RolesService } from './roles.service';
import {Observable} from "rxjs";

describe('RolesService', () => {
  let service: RolesService;
  let firestoreMock: any;

  beforeEach(() => {
    const valueChanges = {
      valueChanges: jest.fn().mockReturnValue(new Observable<Array<any>>())
    }
    firestoreMock = {
      collection: jest.fn().mockReturnValue(valueChanges),
    }
    service = new RolesService(firestoreMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Executar GET', () => {
    const getSpy = jest.spyOn(service, 'get');
    service.get();
    expect(getSpy).toBeTruthy();
  });
});
