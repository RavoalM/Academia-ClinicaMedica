import { map, take } from 'rxjs';

import {
    ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection
} from '@angular/core';
import { CanActivateFn, provideRouter, Router, Routes } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// import { provideAuth } from './components/auth/auth.provider';
// import { AuthService } from './components/auth/auth.service';
// import { provideNotifications } from './components/shared/notificacao/notificacao.provider';

// const usuarioDesconhecidoGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.accessToken$.pipe(
//     take(1),
//     map((token) => (!token ? true : router.createUrlTree(['/inicio']))),
//   );
// };

// const usuarioAutenticadoGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.accessToken$.pipe(
//     take(1),
//     map((token) => (token ? true : router.createUrlTree(['/auth/login']))),
//   );
// };


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()

    // provideNotifications(),
    // provideAuth(),
  ],
};