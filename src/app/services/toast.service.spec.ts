import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have toasts$ observable', (done) => {
    service.toasts$.subscribe(toasts => {
      expect(toasts).toBeDefined();
      expect(Array.isArray(toasts)).toBe(true);
      done();
    });
  });
});
