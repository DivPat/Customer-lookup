import { NgModule } from '@angular/core';
import { DetailsRoutingModule } from './details-routing.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { InterestedProductsComponent } from './interested-products/interested-products.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CustomerDetailsComponent,
    InterestedProductsComponent
  ],
  imports: [
    DetailsRoutingModule,
    NgbNavModule,
    SharedModule,
    TranslateModule.forChild({
      extend:true
    })
  ]
})
export class DetailsModule { }
