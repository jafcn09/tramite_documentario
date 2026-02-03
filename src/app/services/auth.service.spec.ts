import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const modalSpyObj = jasmine.createSpyObj('ModalService', ['clearAllModals', 'alert']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: Router, useValue: routerSpyObj },
        { provide: ModalService, useValue: modalSpyObj }
      ]
    });

    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have currentUser observable', (done) => {
    service.currentUser.subscribe(user => {
      expect(user).toBeDefined();
      done();
    });
  });

  it('should return currentUserValue', () => {
    const currentValue = service.currentUserValue;
    expect(currentValue).toBeDefined();
  });
});
