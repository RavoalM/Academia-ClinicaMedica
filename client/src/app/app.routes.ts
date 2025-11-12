import { Routes } from '@angular/router';

export const routes: Routes = [
    // redirectTo: 'auth/login' arruma essa coisa aqui em baixo depois
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' }, 
//   {
//     path: 'auth',
//     loadChildren: () => import('./components/auth/auth.routes').then((r) => r.authRoutes),
//     canActivate: [usuarioDesconhecidoGuard],
//   },
//   {
//     path: 'inicio',
//     loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
//     canActivate: [usuarioAutenticadoGuard],
//   },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./components/pacientes/paciente.routes').then((r) => r.pacienteRoutes),
    // canActivate: [usuarioAutenticadoGuard],
  },
//   {
//     path: 'notas',
//     loadChildren: () => import('./components/notas/nota.routes').then((r) => r.notaRoutes),
//     canActivate: [usuarioAutenticadoGuard],
//   },
];

