import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Customer, ItemDetails } from 'src/app/shared/models/customer-details.model';
import { CustomerDetailsService } from './../../shared/services/customer-details.service';
import { InterestedProductsService } from './../../shared/services/interested-products.service';
import { Constants } from './../../shared/models/constants';
import { Location } from "@angular/common";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.sass']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy{

  destroy$ = new Subject();
  customerDetails : Customer;
  constants = Constants;
  active = Constants.interestedProductsTab;
  products$: Observable<ItemDetails[]>;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private customerDetailsService:  CustomerDetailsService,
    private interestedProductsService: InterestedProductsService,
    private location: Location){}

  ngOnInit(): void {
    this.customerDetails = this.customerDetailsService.getDefaultCustomer();
    const customerId =this.activatedRoute.snapshot.paramMap.get('id');
    if(customerId) {
       this.customerDetailsService.getCustomerDetails(customerId).pipe(takeUntil(this.destroy$)).subscribe(
        response => this.customerDetails = response
       );
       this.products$ = this.interestedProductsService.getCustomerProducts(customerId);
    }
  }

  onBack(){
    this.location.back();
  }

  onClose() {
    this.router.navigate([Constants.homeRoute]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
