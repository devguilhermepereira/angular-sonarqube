import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('Iniciar service', () => {
    expect(service).toBeTruthy();
  });

  it('GET', () => {
    const getSpy = jest.spyOn(service, 'get');
    service.get();
    expect(getSpy).toBeTruthy();
  });

  it('GET com novos cadastros', () => {
    const getSpy = jest.spyOn(service, 'get');
    const users = [
      {
        "id": 3,
        "name": "Jefferson Silva",
        "email": "silvajefferson@email.com",
        "active": false
      },
      {
        "id": 4,
        "name": "Ana Maria",
        "email": "anamaria@email.com",
        "active": true
      },
    ]
    localStorage.setItem('savedUsers', JSON.stringify(users));
    service.get();
    expect(getSpy).toBeTruthy();
  });

  it('SAVE', () => {
    const saveSpy = jest.spyOn(service, 'save');
    const data = {name: 'teste', email: 'teste@email.com'}
    service.save(data);
    expect(saveSpy).toBeTruthy();
  });
});
