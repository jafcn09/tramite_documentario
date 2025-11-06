import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


if (typeof global === 'undefined') {
  (window as any).global = window;
}


if (typeof (window as any).net === 'undefined') {
  (window as any).net = {
    Socket: class MockSocket {}
  };
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
