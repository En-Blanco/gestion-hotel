import { Routes } from '@angular/router';
import { SobreNosotros } from './pages/sobre-nosotros/sobre-nosotros';
import { Pagina404 } from './pages/pagina-404/pagina-404';

export const routes: Routes = [
  { path: 'sobre-nosotros', component: SobreNosotros },
  { path: '**', component: Pagina404 },
];
