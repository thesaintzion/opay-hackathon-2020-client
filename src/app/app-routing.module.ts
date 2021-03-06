import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/products', pathMatch: 'full'},
  { path: '404', component: PageNotFoundComponent},
  {
    path: 'page',
    loadChildren: () => import('./components/pages/page.module').then(m => m.PageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
