import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Constants } from '../../models/constants';

@Component({
  selector: 'app-screen-header',
  templateUrl: './screen-header.component.html',
  styleUrls: ['./screen-header.component.sass']
})
export class ScreenHeaderComponent {
  @Input() screenHeader: string;
  @Input() screenSubheader: string;

  constructor(private location: Location, private router: Router){}

  onBack(){
    this.location.back();
  }

  onClose() {
    this.router.navigate([Constants.homeRoute]);
  }
}
