import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { ViewProjectComponent } from './_dialogs/view-project/view-project.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { LoadingComponent } from './_dialogs/loading/loading.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ViewProjectComponent, LoadingComponent, ProductsComponent],
  imports: [
    SharedModule,
    CommonModule,
    PageRoutingModule,
    
  ],
  entryComponents: [ViewProjectComponent, LoadingComponent]
})
export class PageModule { }
