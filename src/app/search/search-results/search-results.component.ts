import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from './../../shared/services/customer-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { Customer } from './../../shared/models/customer-details.model';
import { Constants } from './../../shared/models/constants';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass']
})
export class SearchResultsComponent implements OnInit {
  results: Customer[] = [];
  state: any;
  currentPage = 1;
  lastPage: number;
  maxResults = 10;
  lastResult = 10;
  totalResults: number;
  result$: BehaviorSubject<Customer[]> = new BehaviorSubject(this.results);

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerDetailsService:  CustomerDetailsService){
      this.state = this.router.getCurrentNavigation()?.extras.state;
    }

  ngOnInit(): void {
   this.loadCustomerSearchResult();
  }

  loadCustomerSearchResult() {
    //const searchForm = JSON.parse(this.activatedRoute.snapshot.params['searchForm'] || '');   //.snapshot.queryParams['searchForm'];
    const searchForm = this.state.searchForm;
    let values = Object.values(searchForm);
    const formValue = values.reduce((acc: string, val) => acc + val, '')
    if (formValue) {
      this.customerDetailsService.getCustomers(searchForm).subscribe({
        next: (response: Customer[]) => {
          if (response && response.length === 1) {
            this.router.navigate([Constants.detailsRoute, response[0].CustomerID], { replaceUrl: true })
          } else if (response && response.length > 0) {
            this.results = response;
          } else {
            this.results = [];
          }
         
          this.loadResult();
        },
        error: (error) => {
          console.error(error);
        }
      })
    } else {
      this.customerDetailsService.getAllCustomers().subscribe(response => {
        this.results = response;
        this.loadResult();
      }
        );
      
    }

  }

  loadResult(){
    this.totalResults = this.results.length;
    this.lastPage = Math.ceil(this.totalResults /this.maxResults);
    this.result$.next(this.getResult())
    //this.result$ = of(this.results).pipe(map(d => d.slice(0, this.lastResult)));
  }

  getResult(){
    return this.results.slice(0, this.lastResult)
  }

  viewProfile(customerId: string){
    this.router.navigate([Constants.detailsRoute, customerId])
  }

  createCustomer() {
    this.router.navigate([Constants.createCustomerRoute]);
  }

  onScroll() {
    this.currentPage +=1;
    this.lastResult += this.currentPage === this.lastPage? (this.totalResults - this.lastResult) : this.maxResults;
    this.result$.next(this.getResult());
  }


}
