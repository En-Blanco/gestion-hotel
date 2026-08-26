import { Routes } from '@angular/router';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Pagina404 } from './pages/pagina-404/pagina-404';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { LandingPage } from './pages/landing-page/landing-page'; 
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'sobre-nosotros', component: SobreNosotros },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: 'login', component: Login },
  { path: '', component: LandingPage },
  { path: '**', component: Pagina404 },
];
