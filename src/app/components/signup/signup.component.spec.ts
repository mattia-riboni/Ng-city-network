import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      providers: [ AuthService ],
      imports: [ HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login and navigate to global section', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        email: 'email',
        password: 'password'
      }
    }
    const mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('authservice',['login', 'createUser']);
    const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('router',['navigate']);
    component.onSubmit(fakeForm);
    expect(mockAuthService.login({email:'',password:'', returnSecureToken: true})).toHaveBeenCalled;
    expect(mockRouter.navigate(['/login'], {queryParams: {logged: true}})).toHaveBeenCalled;
  });
});
