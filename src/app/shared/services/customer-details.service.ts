import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { Customer, CustomerAddress, CustomerList, CustomerResponse } from '../models/customer-details.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  private newCustomers: Customer[] = [];
  constructor(private http: HttpClient) { }

  getAllCustomersDetails(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>('/assets/mock/customer-details.json').pipe(map(response => {
      response.CustomerList.Customer = response.CustomerList.Customer.concat(this.getNewCustomers())
      return response;
    }
    ));
  }

  getNewCustomers() {
    return this.newCustomers;
  }

  addNewCustomer(customer: Customer) {
    const custIds = this.newCustomers.map(c => Number(c.CustomerID)).sort((a, b) => b - a);
    customer.CustomerID = custIds.length > 0 ? `${custIds[0]}` : '1';
    customer.FullName = `${customer.FirstName} ${customer.LastName}`,
      customer.CustomerAddressLine = Object.values(customer.CustomerAddressList.CustomerAddress).join(', ');
    this.newCustomers.push(customer);
  }

  searchCustomer(form: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  } | any): Observable<string[]> {
    return this.getAllCustomersDetails()
      .pipe<string[]>(map((res: CustomerResponse) =>
        res?.CustomerList?.Customer?.filter(c => this.filterBy(c, form)).map(c => c.CustomerID)
      ));
  }

  getAllCustomers(){
    return this.getAllCustomersDetails()
    .pipe<Customer[]>(map((res: CustomerResponse) =>
      res?.CustomerList?.Customer?.map(c => this.mapCustomerDetails(c))
    ));
  }
  getCustomers(form: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  } | any): Observable<Customer[]> {
    return this.getAllCustomersDetails()
      .pipe<Customer[]>(map((res: CustomerResponse) =>
        res?.CustomerList?.Customer?.filter(c => this.filterBy(c, form)).map(c => this.mapCustomerDetails(c))
      ));
  }

  getCustomerDetails(customerId: string): Observable<Customer> {
    return this.getAllCustomersDetails()
      .pipe<Customer>(map((res: CustomerResponse) => this.mapCustomerDetails(res.CustomerList.Customer.find(c => c.CustomerID === customerId))
      ));
  }

  mapCustomerDetails(customer: Customer | undefined): Customer {
    if (!customer) {
      customer = this.getDefaultCustomer();
    }
    customer.FullName = `${customer.FirstName} ${customer.LastName}`;
    customer.CustomerAddressLine = this.getAddress(customer.CustomerAddressList.CustomerAddress);
    return customer;
  }

  getDefaultCustomer(): Customer {
    return {
        FirstName: '',
        LastName: '',
        CustomerAddressList: {
          CustomerAddress: {
            AddressID: '',
            AddressLine1: '',
            AddressLine2: '',
            City: '',
            Country: '',
            State: '',
            ZipCode: '',
          }
        },
        EmailID: '',
        Phonenumber: '',
        CustomerID: ''
    } 
  }

  getAddress(customerAddress: CustomerAddress): string {
    return Object.values(customerAddress).join(', ');
  }

  filterBy(customer: Customer, form: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }): boolean {
    if (customer && form) {
      let isVerified;
      isVerified = form.firstName ? customer.FirstName?.toLowerCase() === form.firstName.toLowerCase() : true;
      isVerified = form.lastName ? customer.LastName?.toLowerCase() === form.lastName.toLowerCase() : isVerified;
      isVerified = form.email ? customer.EmailID === form.email : isVerified;
      isVerified = form.phoneNumber ? customer.Phonenumber === form.phoneNumber : isVerified;
      return isVerified;
    }
    return false;
  }
}
