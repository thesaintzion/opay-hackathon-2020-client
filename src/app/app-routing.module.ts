import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: '404', component: PageNotFoundComponent},
  // { path: 'page', loadChildren: './components/pages/page.module#PageModule'},
  {
    path: 'page',
    loadChildren: () => import('./components/pages/page.module').then(m => m.PageModule)
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
