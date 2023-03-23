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
  }

  createCustomer() {
    this.router.navigate([Constants.createCustomerRoute]);
  }
}
