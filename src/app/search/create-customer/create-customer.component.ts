import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDetailsService } from 'src/app/shared/services/customer-details.service';
import { Customer, CustomerAddress } from './../../shared/models/customer-details.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.sass']
})
export class CreateCustomerComponent {
  createCustomerForm: FormGroup;
  countries: string[] = ['US'];
  states = ['New York', 'Washington', 'California'];
  showAlert = false;
  constructor(public fb: FormBuilder,
    private customerDetailsService: CustomerDetailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.createCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['',  Validators.required],
      email: ['', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }],
      phoneNumber: ['',  {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }],
      country: ['', Validators.required],
      billingAddress: this.fb.group({
        address1: [''],
        state: [''],
        city: [''],
        zipcode: ['']
      })
    })
  }
  get f() { 
    return this.createCustomerForm.controls; 
  }

  createCustomer(){
    this.showAlert = true;
    if(this.createCustomerForm.valid) {
      const searchForm = this.createCustomerForm.value;
      const customerAddress: CustomerAddress= {
          AddressID: '12',
          AddressLine1: searchForm.billingAddress.address1,
          State: searchForm.billingAddress.state,
          City: searchForm.billingAddress.city,
          ZipCode: searchForm.billingAddress.zipcode,
          Country: searchForm.country,
      }
      const customer: Customer = {
        CustomerID: '',
        FirstName: searchForm.firstName,
        LastName: searchForm.lastName,
        EmailID: searchForm.email,
        Phonenumber: searchForm.phoneNumber,
        CustomerAddressList: {
          CustomerAddress: customerAddress
        }
      }
        this.customerDetailsService.addNewCustomer(customer)
    }
  }
}
