import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterestedProductsResponse, ItemDetails } from './../models/customer-details.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestedProductsService {

  constructor(private http: HttpClient) { }


  getAllInterestedProducts(): Observable<InterestedProductsResponse>{
    return this.http.get<InterestedProductsResponse>('/assets/mock/interested-products.json');
  }

  getCustomerProducts(customerId: string): Observable<ItemDetails[]> {
    return this.getAllInterestedProducts()
    .pipe(map(r => r.CustomerInterestedItemsList.Item.filter(i => i.CustomerID === customerId)));
  }
}
