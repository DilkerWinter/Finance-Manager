import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from '../services/authService';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), AuthService]
};
