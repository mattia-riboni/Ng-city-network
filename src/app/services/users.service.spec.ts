import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { newUser } from '../components/models/sign-up';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('Should retrive users from GET method', () => {
    let fakeToken: string = '12345'
    let fakeUsers = [
      {
        firstName: 'first name 1',
        lastName: 'last name 1',
        email: 'email1@test.com'
      },
      {
        firstName: 'first name 2',
        lastName: 'last name 2',
        email: 'email2@test.com'
      }
    ];
    service.getUsers(fakeToken).subscribe((posts: any) => {
      expect(posts).toEqual(fakeUsers);
    })

    const request = httpTestingController.expectOne(service.GET_URL + fakeToken);
    expect(request.request.method).toBe('GET');

    request.flush(fakeUsers);

  })

  it('Should register a new user via POST method', () => {
    const fakeBody: newUser = {
      first_name: 'first name test',
      last_name: 'last name test',
      email: 'email@test',
      password: 'test password',
      username: 'test username',
      city: 'test city'
    }

    service.registerUser(fakeBody).subscribe();
    const request = httpTestingController.expectOne(service.REGISTER_URL);
    expect(request.request.method).toBe('POST');

  });

  it('should delete a user via DELETE method', () => {
    const fakeId: string | number = 12;
    service.deleteUser(fakeId).subscribe();
    const request = httpTestingController.expectOne(service.DELETE_URL + fakeId + '.json');
    expect(request.request.method).toBe('DELETE');

  });

  it('should create a new user via POST method', () => {
    let fakeFirst = 'est first';
    let fakeLast = 'test last';
    let fakeEmail = 'test email';
    let fakeCity = 'test city';
    let fakeGender = 'test gender';
    let fakePosts = [{
      title: 'test post 1',
    },
    {
      title: 'test post 2'
    }
  ]

  service.createNewUser(fakeFirst, fakeLast, fakeEmail, fakeCity, fakeGender, fakePosts).subscribe();
  const request = httpTestingController.expectOne(service.REGISTER_URL);
  expect(request.request.method).toBe('POST');
  })

  it('Should edit user via PUT method', () => {
    const fakeBody: newUser = {
      first_name: 'first name test',
      last_name: 'last name test',
      email: 'email@test',
      password: 'test password',
      username: 'test username',
      city: 'test city'
    };

    const fakeId = 'id';

    service.editUser(fakeId, fakeBody).subscribe();
    const request = httpTestingController.expectOne(service.DELETE_URL + fakeId + '.json');
    expect(request.request.method).toBe('PUT');
  })

});
