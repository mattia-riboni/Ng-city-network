import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from './users.component';
import { NgForm } from '@angular/forms';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [ AuthService, UsersService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should push avatar srcs', () => {
    component.usersArr = [{
      user:1
    }]
    component.pushAvatarSrc();
    expect(component.avatars.length).toEqual(1)
  })

  it('should search the given first name push it into the result', () => {
    const fakeUsers: any[] = [
      {
      first_name: 'firstName1',
      last_name: 'lastName1',
      email: 'email1'
      },
      {
      first_name: 'firstName2',
      last_name: 'lastName2',
      email: 'email2'
      }
    ]
    component.users = fakeUsers;
    component.searchUser('firstName1');
    expect(component.searchResults).toEqual([fakeUsers[0]]);
  });

  it('should delete search results and set search as false', () => {
    component.searchResults = ['1st', '2nd'];
    component.search = true;
    component.goBack();
    expect(component.searchResults).toEqual([]);
    expect(component.search).toBeFalsy;
  });

  it('should remove user from his array and present alert', () => {
    const fakeId: string = 'id';
    const fakeUser: string = 'user';
    const fakeIndex: number = 0;
    let fakeUsers = ['user1', 'user2'];
    component.users = fakeUsers;
    const mockUsersService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('userService', ['deleteUser']);
    component.deleteUser(fakeId, fakeUser, fakeIndex);
    expect(component.users.length).toEqual(1);
    expect(mockUsersService.deleteUser(fakeId)).toHaveBeenCalled;
    expect(component.presentAlert(fakeUser,'','')).toHaveBeenCalled;
  });

  it('should create a new user and add it to users list', () => {
    let fakeForm: NgForm = <NgForm>{
      value: {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        city: 'city',
      }
    }
    const fakeFirstPost = {post: 'first post'};
    const mockUsersService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('usersService', ['createNewUser']);
    component.users = [];
    component.avatars = [];
    component.creatingNewUser = true;
    component.createNewUser(fakeForm);
    expect(mockUsersService.createNewUser(fakeForm.value.firstName, fakeForm.value.lastName, fakeForm.value.email, fakeForm.value.city, component.gender, [fakeFirstPost])).toHaveBeenCalled;
    expect(component.users.length).toEqual(1);
    expect(component.avatars.length).toEqual(1);
    expect(component.creatingNewUser).toBeTruthy;
  })
});
