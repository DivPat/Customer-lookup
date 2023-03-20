import { Component, Input, OnInit } from '@angular/core';
import { ItemDetails } from './../../shared/models/customer-details.model';

@Component({
  selector: 'app-interested-products',
  templateUrl: './interested-products.component.html',
  styleUrls: ['./interested-products.component.sass']
})
export class InterestedProductsComponent implements OnInit {

  @Input() product: ItemDetails;


  ngOnInit() {

  }


}
