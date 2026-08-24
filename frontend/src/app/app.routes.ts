import { Routes } from '@angular/router';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Pagina404 } from './pages/pagina-404/pagina-404';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';

export const routes: Routes = [
  { path: 'sobre-nosotros', component: SobreNosotros },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: '**', component: Pagina404 },
];
