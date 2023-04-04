import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ AuthService ],
      imports: [ HttpClientTestingModule, FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login and navigate to global section', () => {
    let mockLocalStorage: any = {};
    const fakeForm: NgForm = <NgForm>{
      value: {
        email: 'email',
        password: 'password'
      }
    }
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (mockLocalStorage[key] = value + '')
    );
    const mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('authservice',['login', 'createUser']);
    const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('router',['navigate']);
    component.onSubmit(fakeForm);
    expect(mockAuthService.login({email:'',password:'', returnSecureToken: true})).toHaveBeenCalled;
    expect(mockRouter.navigate(['/global'], {queryParams: {logged: true}})).toHaveBeenCalled;
    expect(mockLocalStorage.user).toBeDefined
  });


});
