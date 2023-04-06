import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { TopBarComponent } from './top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([
        {
            path: 'login',
            component: TopBarComponent,
        }
    ])],
      declarations: [ TopBarComponent ],
      providers: [ AuthService,
        { provide: ActivatedRoute,
          useValue: {
            params: of({
              logged: true
            })
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should logout', () => {
    const mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('authService', ['logout']);
    const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('router', ['navigate']);
    component.isLogged = true;
    component.logout();
    expect(mockAuthService).toHaveBeenCalled;
    expect(mockRouter.navigate(['/login'])).toHaveBeenCalled;
    expect(component.isLogged).toBe(false);
  })

  it('should set user as logged', () => {
    component.logged();
    expect(component.isLogged).toBe(true);
  });

  it('should navigate to login page', () => {
    const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('router', ['navigate']);
    component.log();
    expect(mockRouter.navigate(['/login'])).toHaveBeenCalledTimes(1)
  })
});
