import { NgModule } from "@angular/core";
import { CustomerSearchComponent } from "./customer-search/customer-search.component";
import { SearchRoutingModule } from "./search-routing.module";
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchResultsComponent } from './search-results/search-results.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, '/assets/i18n/search/', '.json')
}

@NgModule({
    declarations: [
        CustomerSearchComponent,
        SearchResultsComponent,
        CreateCustomerComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        NgbAlertModule,
        TranslateModule.forChild(
            {
                loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
                }
            }
        )
    ]
})
export class SearchModule {

 }