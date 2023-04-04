import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Login } from '../components/models/login';
import { SignUp } from '../components/models/sign-up';
import { User } from '../components/models/user'

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('signup() Should signup via post method',() => {
    const fakeBody: SignUp = {
      email: 'test email',
      password: 'test password',
      returnSecureToken: true,
    }

    service.signUp(fakeBody).subscribe();
    const request = httpTestingController.expectOne(service.SIGNUP_URL);
    expect(request.request.method).toBe('POST')
  })

  it('login() should login via post method',() => {
    const fakeBody: Login = {
      email: 'test email',
      password: 'test password',
      returnSecureToken: true,
    }

    service.login(fakeBody).subscribe();
    const request = httpTestingController.expectOne(service.LOGIN_URL);
    expect(request.request.method).toBe('POST')
  })

  it('createUser() should create a new user', () => {
    const fakeEmail = 'user@test';
    const fakeId = 'test id';
    const fakeToken = 'test token';
    const fakeExpDate = new Date;
    let fakeUser = new User(fakeEmail, fakeId, fakeToken, fakeExpDate)
    service.createUser(fakeEmail, fakeId, fakeToken, fakeExpDate);
    expect(service.user).toEqual(fakeUser);
  })

  it('createUser() should return the user as logged', () => {
    const fakeEmail = 'user@test';
    const fakeId = 'test id';
    const fakeToken = 'test token';
    const fakeExpDate = new Date;
    service.createUser(fakeEmail, fakeId, fakeToken, fakeExpDate);
    expect(service.isLoggedIn).toBe(true);
  })

  it('logout() ould remove the user from local storage', () => {
    let localStore: any = {user: 'test'}

    spyOn(window.localStorage, 'removeItem').and.callFake(() => (localStore = {}));

    service.logout();
    expect(localStore).toEqual({});
  });

  it('logout() should set logged = false', () => {
    service.logout();
    expect(service.isLoggedIn).toBe(false)
  });

  it('logout() should set user as null', () => {
    service.logout();
    expect(service.user).toBe(null);
  })

});
