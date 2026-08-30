import { Routes } from '@angular/router';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Pagina404 } from './pages/pagina-404/pagina-404';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: LandingPage },
      { path: 'dashboard-admin', component: DashboardAdmin },
      { path: 'sobre-nosotros', component: SobreNosotros }
    ],
  },
  { path: 'registro', component: Registro},
  { path: 'login', component: Login },
  { path: '**', component: Pagina404 },
];
