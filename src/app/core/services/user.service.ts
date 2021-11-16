import {Injectable} from '@angular/core';
import Mock from '../../../../mock/user.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let users = Mock.users;
        let savedUsers: Array<any> = JSON.parse(<string>localStorage.getItem('savedUsers'));
        if (savedUsers && savedUsers.length) savedUsers.forEach((row: any) => users.push(row));
        resolve(users);
      } catch (e) {
        reject(e)
      }
    })
  }

  save(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        let users = [];
        let savedUsers = JSON.parse(<string>localStorage.getItem('savedUsers'));
        users = savedUsers && savedUsers.length ? savedUsers : [];
        users.push(data)
        localStorage.setItem('savedUsers', JSON.stringify(users));
        resolve(true);
      } catch (e) {
        reject(e)
      }
    })
  }
}
