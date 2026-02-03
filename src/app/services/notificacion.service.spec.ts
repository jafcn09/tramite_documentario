import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NotificacionService } from './notificacion.service';

describe('NotificacionService', () => {
  let service: NotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        NotificacionService
      ]
    });

    service = TestBed.inject(NotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have notificaciones$ observable', (done) => {
    service.notificaciones$.subscribe(notifications => {
      expect(notifications).toBeDefined();
      expect(Array.isArray(notifications)).toBe(true);
      done();
    });
  });

  it('should have contadorNoLeidas$ observable', (done) => {
    service.contadorNoLeidas$.subscribe(count => {
      expect(count).toBeDefined();
      expect(typeof count).toBe('number');
      done();
    });
  });
});
