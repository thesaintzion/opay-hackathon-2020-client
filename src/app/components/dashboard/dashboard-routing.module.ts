import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadLayoutComponent } from './dashboad-layout/dashboad-layout.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {path: '', component: DashboadLayoutComponent, children: [
    // {path: '',  redirectTo: '/admin/history', pathMatch: 'full'},
    {path: '',  redirectTo: '/admin/transfer', pathMatch: 'full'},
    // {path: 'history', component: TransactionsComponent},
    {path: 'transfer', component: TransferComponent},
  ]},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
