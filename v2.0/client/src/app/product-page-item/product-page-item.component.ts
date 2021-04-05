import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/DTO/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page-item',
  templateUrl: './product-page-item.component.html',
  styleUrls: ['./product-page-item.component.scss'],
})
export class ProductPageItemComponent implements OnInit {
  @Input()
  product: Product;

  constructor() {}

  ngOnInit(): void {}
}
