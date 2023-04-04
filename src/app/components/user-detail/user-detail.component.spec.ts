import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserDetailComponent } from './user-detail.component';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      providers: [ AuthService, UsersService, {
        provide: ActivatedRoute, useValue: fakeActivatedRoute
      }],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.newPostOpened = false;
    component.editingPostsOpened = false;
    component.editingUserOpened = false;
    fixture.detectChanges();
  });

  it('should like the post', () => {
    let fakeUser = {
      user: 'test',
      posts: [{
        post:1,
        likes: 5,
      }]
    }
    component.user = fakeUser;
    component.isPostLiked[0] = false;
    component.like(0);
    expect(component.user.posts[0].likes).toEqual(6);
    expect(component.isPostLiked[0]).toBeTrue
  })

  it('should dislike the post', () => {
    let fakeUser = {
      user: 'test',
      posts: [{
        post:1,
        likes: 5,
      }]
    }
    component.user = fakeUser;
    component.isPostLiked[0] = true;
    component.like(0);
    expect(component.user.posts[0].likes).toEqual(4);
    expect(component.isPostLiked[0]).toBe(false);
  });

  it('should open new post editor', () => {
    const newPostEditor = fixture.debugElement.query(By.css('#new-post'))
    expect(newPostEditor).toBeNull;
    component.editingUserOpened = true;
    component.editingPostsOpened = true;
    component.newPost();
    expect(component.newPostOpened).toBe(true);
    expect(component.editingPostsOpened).toBe(false);
    expect(component.editingUserOpened).toBe(false);
    expect(newPostEditor).toBeDefined;
  })

  it('should open user editor', () => {
    const userEditor = fixture.debugElement.query(By.css('#editing-user'));
    expect(userEditor).toBeNull;
    component.newPostOpened = true;
    component.editingPostsOpened = true;
    component.editingUser();
    fixture.detectChanges();
    expect(component.newPostOpened).toBe(false)
    expect(component.editingPostsOpened).toBe(false);
    expect(component.editingUserOpened).toBe(true);
    expect(userEditor).toBeDefined;
  });

  it('should open post editor', () => {
    const postEditor = fixture.debugElement.query(By.css('#editing-post'));
    expect(postEditor).toBeNull;
    component.newPostOpened = true;
    component.editingUserOpened = true;
    component.editingPostsOpened = false;
    component.editingPosts();
    expect(component.newPostOpened).toBe(false);
    expect(component.editingPostsOpened).toBe(true);
    expect(component.editingUserOpened).toBe(false);
    expect(postEditor).toBeDefined;
  })

  it('should get values from edit post form and call usersService.editUser once', () => {
    const mockUsersService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('usersService', ['editUser']);
    component.status = 'status';
    component.selectedCategory = 'category';
    let fakeUser = {
      id: '1',
      posts: [
        {
          title: '',
          caption: '',
          city: '',
          category: '',
          status: '',
        }
      ]
    }
    component.user = fakeUser;
    let fakeFrom = <NgForm>{
      value: {
        title: 'title',
        caption: 'caption',
        city: 'city',
      }
    }
    component.editPost(fakeFrom, 0);
    fixture.detectChanges();
    expect(component.user.posts[0].title).toEqual('title');
    expect(component.user.posts[0].caption).toEqual('caption');
    expect(component.user.posts[0].city).toEqual('city');
    expect(component.user.posts[0].category).toEqual('category');
    expect(component.user.posts[0].status).toEqual('status');
    expect(mockUsersService.editUser(fakeUser.id, fakeUser)).toHaveBeenCalled
  })


  it('should push img srcs into his array', () => {
    component.user = {
      user: 0,
      posts: [{
        post: 0,
      }]
    }
    component.pushImgSrc();
    expect(component.imgSrcs.length).toEqual(1);
  })

  it('should set posts as unliked', () => {
    component.isPostLiked = [true];
    component.user = {
      user: 0,
      posts: [{
        post: 0,
      }]
    }
    component.pushPostNotLiked();
    expect(component.isPostLiked[0]).toBe(true);
  });

  it('should set comment as unopened', () => {
    component.areCommentsOpened = [];
    component.user = {
      user: 0,
      posts: [{
        post: 0,
      }]
    };
    component.pushCommentsUnopened();
    expect(component.areCommentsOpened[0]).toBe(false);
  });

  it('should publish a new comment', () => {
      let fakeForm = <NgForm>{
        value: {
          name: 'name',
          comment: 'comment',
        }
      }

    let fakeUser = {
      user: 1,
      posts: [
        {
          post:1,
          comments:[]
        }
      ]
    };
    component.user = fakeUser;
    spyOn(component, 'resetForm').and.returnValue(true);
    component.publishComment(fakeForm, 0)
    expect(component.user.posts[0].comments[0].name).toEqual('name');
    expect(component.user.posts[0].comments[0].comment).toEqual('comment');
    expect(component.resetForm).toHaveBeenCalled
  })

});
