import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { GlobalComponent } from './global.component';


describe('GlobalComponent', () => {
  let component: GlobalComponent;
  let fixture: ComponentFixture<GlobalComponent>;
  let fakeActivatedRoute =  {
    queryParams: of<{city: string} | null>({
      city: 'milan'
    })
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ GlobalComponent ],
      providers: [
        AuthService, UsersService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set every post as unliked', () => {
    component.usersArr = [
      {
        posts:['post1']
      },
      {
        posts:['post1', 'post2']
      }
    ];

    let fakeIsPostLiked = [
      [false],
      [false, false]
    ];
    component.pushUserLikes();
    expect(component.isPostLiked).toEqual(fakeIsPostLiked)
  })

  it("should push avatar's link into his array", () => {
    component.usersArr.length = 5;
    component.pushAvatars();
    expect(component.avatars.length).toBe(5)
  });

  it('should set every comment section as unopened', () => {
    component.usersArr = [
      {
        posts:['post1']
      },
      {
        posts:['post1', 'post2']
      }
    ];

    let fakeAreCommentsOpened = [
      [false],
      [false, false]
    ];
    component.pushUserLikes();
    expect(component.isPostLiked).toEqual(fakeAreCommentsOpened)
  });

  it("should push img sources's link into his array", () => {
    component.usersArr = [
      {
        posts:['post1']
      },
      {
        posts:['post1', 'post2']
      }
    ];
    component.pushImgs();
    expect(component.imgSrcs.length).toBe(3)
  });

  it('should like the post',() => {
    let fakeUser = 1;
    let fakePost = 1;
    component.users = [
      {
        posts:[{
          post: 1,
          likes: 0
        }]
      },
      {
        posts:[{
          post: 2,
          likes: 3
        }]
      }
    ];

    component.usersArr = component.users;
    component.pushUserLikes();
    component.like(1, 0);
    expect(component.users[1].posts[0].likes).toEqual(4)
  });

  it('should get city from params',() => {
    component.getCity();
    expect(component.city).toBe('milan')
  })

  it('should publish a new comment', () => {
    let fakeUsers = [{
      user: 0,
      posts: [{
        comments: []
      }]
    }];
    component.users = fakeUsers;
    let fakeForm: NgForm = <NgForm>{
      value: {
        name: 'name',
        comment:'comment',
      }
    }
    const mockUsersService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('usersService', ['editUser']);
    spyOn(component, 'resetForm').and.returnValue(true);
    component.publishComment(fakeForm, 0, 0);
    expect(component.users[0].posts[0].comments.length).toEqual(1);
    expect(mockUsersService.editUser(0, component.users[0])).toHaveBeenCalled;
  })
});

