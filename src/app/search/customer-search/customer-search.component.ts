import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDetailsService } from './../../shared/services/customer-details.service';
import { Customer, CustomerList } from './../../shared/models/customer-details.model';
import { Constants } from '../../shared/models/constants';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.sass']
})
export class CustomerSearchComponent implements OnInit {
  customerSearchForm: FormGroup;

  constructor(public fb: FormBuilder,
    private customerDetailsService: CustomerDetailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.customerSearchForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: ['']
    })
  }

  onCustomerSearch() {

    this.router.navigate([Constants.resultRoute ], {state: { searchForm: this.customerSearchForm.value }});
    // let values = Object.values(this.customerSearchForm.value);
    // const formValue = values.reduce((acc: string, val) => acc + val, '')
    // if (formValue) {
    //   this.customerDetailsService.searchCustomer(this.customerSearchForm.value).subscribe({
    //     next: (response: string[]) => {
    //       if (response && response.length === 1) {
    //         this.router.navigate([Constants.detailsRoute, response[0]])
    //       } else if (response && response.length > 0) {
    //         this.router.navigate([Constants.resultRoute], { queryParams: { customerIdList: response, showAll: false } });
    //       } else {
    //         this.router.navigate([Constants.resultRoute], { queryParams: { customerIdList: [], showAll: false } });
    //       }
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     }
    //   })
    // } else {
    //   this.router.navigate([Constants.resultRoute], { queryParams: { customerIdList: [], showAll: true } });
    // }

  }

  createCustomer() {
    this.router.navigate([Constants.createCustomerRoute]);
  }
}
