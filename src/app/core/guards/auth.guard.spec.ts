import {AuthGuard} from './auth.guard';
import {ActivatedRouteSnapshot} from "@angular/router";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {navigate: jest.fn()};
    guard = new AuthGuard(routerMock);
  });

  it('canActivate', () => {
    const canActivateSpy = jest.spyOn(guard, 'canActivate');
    const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    guard.canActivate(route, null as any);
    expect(canActivateSpy).toBeTruthy();
  });
});
